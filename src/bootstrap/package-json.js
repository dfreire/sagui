import { join } from 'path'
import json from '../util/json'

const saguiScripts = {
  'start': 'npm run develop',
  'test': 'NODE_ENV=test karma start --single-run --no-auto-watch',
  'test:watch': 'NODE_ENV=test karma start --no-single-run --auto-watch',
  'develop': 'webpack-dev-server --port 3000 --host 0.0.0.0',
  'build': 'webpack',
  'dist': 'NODE_ENV=production webpack -p'
}

export default function (projectPath) {
  const packagePath = join(projectPath, 'package.json')
  const packageJSON = json.read(packagePath)

  json.write(packagePath, {
    ...packageJSON,
    scripts: {
      ...saguiScripts,
      ...withoutDefaults(packageJSON.scripts)
    }
  })
}

/**
 * Remove default configurations generated by NPM that can be overwriten
 * We don't want to overwrite any user configured scripts
 */
function withoutDefaults (scripts) {
  const defaultScripts = {
    'test': 'echo "Error: no test specified" && exit 1'
  }

  return Object.keys(scripts)
    .filter((key) => !scripts[key] !== '' && scripts[key] !== defaultScripts[key])
    .reduce((filtered, key) => {
      return {
        ...filtered,
        [key]: scripts[key]
      }
    }, {})
}
