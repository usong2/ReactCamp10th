# Style Loaders

```bash
npx create-react-app style-loaders-example
cd style-loaders-example

git add .
git commit -m 'save'

npm run eject
# ? Are you sure you want to eject? This actions is permanent. 
# - y
```

<br>

## CSS (webpack.config.js)

```js
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
            {
              test: cssRegex, // /\.css$/
              exclude: cssModuleRegex, // /\.module\.css$/
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
```

```javascript
import './App.css';
```

<br>

## CSS Module (webpack.config.js)

```js
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            {
              test: cssModuleRegex, // /\.module\.css$/
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              }),
            },
```

```javascript
import styles from './App.module.css';
```

<br>

## Sass (webpack.config.js)

```javascript
            // Opt-in support for SASS (using .scss or .sass extensions).
            // By default we support SASS Modules with the
            // extensions .module.scss or .module.sass
            {
              test: sassRegex, // /\.(scss|sass)$/
              exclude: sassModuleRegex, // /\.module\.(scss|sass)$/
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'sass-loader'
              ),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
```

```javascript
import './App.scss';
import './App.sass';
```

<br>

## Sass Module (webpack.config.js)

```javascript
            // Adds support for CSS Modules, but using SASS
            // using the extension .module.scss or .module.sass
            {
              test: sassModuleRegex, // /\.module\.(scss|sass)$/
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
                'sass-loader'
              ),
            },
```

```javascript
import styles from './App.module.scss';
import styles from './App.module.sass';
```

