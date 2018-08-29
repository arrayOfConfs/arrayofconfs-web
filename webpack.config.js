const CopyWebpackPlugin = require('copy-webpack-plugin');
const HandlebarsWebpackPlugin = require('handlebars-webpack-plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const serverConfigs = {
  default: {
    host: 'localhost',
    port: 3000
  },
  development: {
    port: 3080
  },
  production: {
  }
};

const serverConfig = Object.assign({}, serverConfigs.default, serverConfigs[env]);

const host = process.env.HOST || serverConfig.host;
const port = process.env.PORT || serverConfig.port;

const configs = {
  default: {
    app: [
			'./App.jsx'
		],
  },
  development: {
    app: [
			`webpack-dev-server/client?http://${host}:${port}`,
			'./App.jsx'
		],
    config: {
			'api': {
				'origin': 'http://localhost:5000'
			}
		},
    outputPath: 'tmp'
  },
  production: {
    config: {
			'api': {
				'origin': 'https://api.arrayofconfs.com'
			}
		},
    outputPath: 'build'
  }
};

const webpackConfig = Object.assign({}, configs.default, configs[env]);
const { app, baseHref, config, outputPath } = webpackConfig;

const plugins = [
  new webpack.DefinePlugin({
    CONFIG: JSON.stringify(
      Object.assign({}, { baseHref }, config)
    )
  }),
  new HandlebarsWebpackPlugin({
    entry: path.join(process.cwd(), 'src', '*.hbs'),
    output: path.join(process.cwd(), outputPath, '[name].html'),
    data: {
      baseHref
    }
  })
];

if (fs.existsSync(path.join(__dirname, 'src', 'icons'))) {
  plugins.push(
    new CopyWebpackPlugin([
      { from: 'icons', to: 'icons' }
    ])
  );
}

if (env === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  );
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app
  },
  devServer: {
    host,
    port,
    contentBase: `./${outputPath}`,
    disableHostCheck: true,
    publicPath: '/',
    hot: true,
    historyApiFallback: {
      index: 'index.html',
      disableDotRule: true
    },
    stats: {
      colors: true
    }
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [
            'jsx-control-statements',
            '@babel/plugin-transform-runtime'
          ],
          presets: [
            '@babel/preset-react',
            '@babel/preset-env'
          ]
        }
      },
      {
        test: /\.sass$/,
        loader: 'style-loader'
      },
      {
        test: /\.sass$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
          url: false
        }
      },
      {
        test: /\.sass$/,
        loader: 'sass-loader'
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, outputPath)
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  }
};
