import { NoErrorsPlugin } from 'webpack'
import path from 'path'

export default {
  name: 'base',
  configure ({ projectPath, saguiPath }) {
    const projectSourcePath = path.join(projectPath, 'src')

    return {
      context: projectSourcePath,

      devtool: 'source-map',

      plugins: [new NoErrorsPlugin()],

      resolve: {
        extensions: [''],

        root: [
          path.join(projectPath, '/node_modules'),
          projectSourcePath,

          // Sagui node_modules is required in the path to be able
          // to load the `webpack-hot-middleware`
          path.join(saguiPath, '/node_modules')
        ]
      },
      resolveLoader: {
        // Should first try to resolve loaders nested within Sagui.
        // This fixes an issue in NPM v2 where webpack incorrectly
        // thinks that the package `eslint` is the `eslint-loader`
        modulesDirectories: [
          path.join(saguiPath, '/node_modules'),
          path.join(projectPath, '/node_modules')
        ]
      }
    }
  }
}
