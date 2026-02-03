#!/usr/bin/env node
/**
 * Build script per Schillinger
 * Converte ES6 modules in ES5 QML-compatible con Babel
 * 
 * Uso:
 *   node build.mjs          - Build una volta
 *   node build.mjs --watch  - Build automatico quando salvi
 */

import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as babel from '@babel/core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isWatch = process.argv.includes('--watch');

// Plugin Babel per esbuild
const babelPlugin = {
  name: 'babel-loader',
  setup(build) {
    build.onLoad({ filter: /\.js$/ }, async (args) => {
      const source = await fs.promises.readFile(args.path, 'utf8');
      
      try {
        const result = babel.transformSync(source, {
          filename: args.path,
          presets: [
            ['@babel/preset-env', {
              targets: { ie: '11' },
              modules: false
            }]
          ]
        });
        
        return {
          contents: result.code,
          loader: 'js'
        };
      } catch (error) {
        console.error(`Babel error in ${args.path}:`, error.message);
        return {
          contents: source,
          loader: 'js'
        };
      }
    });
  }
};

const buildConfig = {
  entryPoints: ['src/core/adapter/api.js'],
  outfile: 'src/gui/Schillinger.js',
  bundle: true,
  format: 'iife',
  target: 'es5',
  platform: 'browser',
  globalName: 'SchillingerCore',
  minify: false,
  sourcemap: false,
  plugins: [
    babelPlugin,
    {
      name: 'qml-wrapper',
      setup(build) {
        build.onEnd(result => {
          if (result.errors.length === 0) {
            console.log('✅ Build completato:', new Date().toLocaleTimeString());
            
            // Leggi il file generato
            let content = fs.readFileSync(path.join(__dirname, 'src/gui/Schillinger.js'), 'utf-8');
            
            // Aggiungi header e esportazioni QML
            content = `// Auto-generated Schillinger QML Bridge
// Generated from: src/core/adapter/api.js
// DO NOT EDIT MANUALLY - Run 'npm run build' or 'npm run watch' to regenerate
// Last build: ${new Date().toISOString()}

${content}

// Export functions for QML compatibility
// ********** TODO add here other files insertions!!!! *********
var getSync = SchillingerCore.getSync;
var score = SchillingerCore.score;
var insertNote = SchillingerCore.score.insertNote;
`;
            
            fs.writeFileSync(path.join(__dirname, 'src/gui/Schillinger.js'), content, 'utf-8');
            console.log('📝 Esportazioni QML aggiunte');
          } else {
            console.error('❌ Errore build:', result.errors);
          }
        });
      }
    }
  ]
};

async function build() {
  try {
    if (isWatch) {
      console.log('👀 Watch mode attivo - Ricompilo ad ogni salvataggio...\n');
      const ctx = await esbuild.context(buildConfig);
      await ctx.watch();
      console.log('👁️  In ascolto di cambiamenti in src/core/...');
    } else {
      console.log('🔨 Building Schillinger...\n');
      await esbuild.build(buildConfig);
      console.log('\n✨ Build completato!\n');
    }
  } catch (error) {
    console.error('❌ Build error:', error);
    process.exit(1);
  }
}

build();
