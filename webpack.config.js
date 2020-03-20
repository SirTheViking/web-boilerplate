const path = require('path');

const HTMLPlugin = require('html-webpack-plugin');
const HTMLReplace = require('html-replace-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const PWAManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');




const appInfo = {
    title: 'Boilerplate',
    description: 'Webapp boilerplace',
    background: '#ffffff',
    theme: '#ffffff'
};




module.exports = (env, argv) => {

    let dev = argv.mode === 'development';

    return {
        entry: path.resolve(__dirname, 'src/index.js'),
    
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[contenthash].js'
        },
    
        resolve: {
            extensions: ['.jsx', '.js', '.scss', '.html', '*', '.scss', '.tsx', '.ts'],
            alias: {
                'components': path.resolve(__dirname, 'src/components'),
                'styles': path.resolve(__dirname, 'src/styles')
            }
        },
    
        devServer: {
            historyApiFallback: true
        },
    
        module: {
            rules: [
                {
                    test: /\.(ts|js|jsx|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        MiniCss.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
    
        plugins: [
            new HTMLPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: 'index.html'
            }),

            new HTMLReplace([
                {
                    pattern: '_DESC_',
                    replacement: appInfo.description
                },
                {
                    pattern: '_TITLE_',
                    replacement: appInfo.title
                }
            ]),
    
            new MiniCss({
                filename: 'styles/[hash].css'
            }),
    
            new PWAManifest({
                filename: '[hash].json',
                
                name: appInfo.name,
                short_name: appInfo.name,
                description: appInfo.description,
                
                background_color: appInfo.background,
                theme_color: appInfo.theme,
    
                crossorigin: 'use-credentials',
                orientation: 'portrait',
                display: 'standalone',
                fingerprints: true,
                // Icons needed
            }),
    
            new OfflinePlugin({
                responseStrategy: dev ? 'network-first' : 'cache-first',
                minify: true,
                version: 'timeline[hash]',
                externals: [
                    // Google fonts and things here
                ],
                autoUpdate: true
            }),
    
            new CleanPlugin()
        ]
    }
}