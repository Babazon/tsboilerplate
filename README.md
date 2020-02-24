[![Build status](https://build.appcenter.ms/v0.1/apps/a0fa5ad7-1471-4478-91a3-a1cea41979e2/branches/master/badge)](https://appcenter.ms)

# Install node modules and pods

`$ yarn`
`$ cd ios && pod install`

# Rename the app

`$ yarn run react-native-rename <your app name here>`

# Start Metro

`$ yarn start`

# Build the app

`$ yarn ios`
`$ yarn android`

## Alternatively, install VSCode extension "React Native Tools" and add the followling launch configuration items to your VSCode launch.json. This way you can select "Debug IOS/Android" in your VSCode debug menu

```
"configurations": [
  {
      "name": "Debug Android",
      "program": "${workspaceRoot}/.vscode/launchReactNative.js",
      "type": "reactnative",
      "request": "launch",
      "platform": "android",
      "sourceMaps": true,
      "outDir": "${workspaceRoot}/.vscode/.react"
    },
    {
      "name": "Debug iOS",
      "cwd": "${workspaceFolder}",
      "type": "reactnative",
      "request": "launch",
      "platform": "ios",
      "sourceMaps": true,
      "outDir": "${workspaceRoot}/.vscode/.react"
    }
]
```
