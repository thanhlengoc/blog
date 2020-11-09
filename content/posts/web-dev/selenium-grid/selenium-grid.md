---
title: Selenium Grid
description: Setup Selenium Grid for automation testing
date: 2020-11-07T11:00:00.000Z
---

### Architecture
    
![SeleniumGrid](seleniumgrid-1.png)

### Setup

1. Install appium on ubuntu: [Install Selenium On Ubuntu](https://confusedcoders.com/general-programming/mobile/how-to-install-appium-in-ubuntu)
2. Download Selenium Server (Grid): [Download Selenium](https://www.selenium.dev/downloads/ )
3. Node config: The magic pretty much all happens in the "node config" file, which is defined as JSON. There are a lot ofnodeconfig optionsto choose from.
  
Here examples for config node on android and ios:

- nodeconfig-android.json

```json
{
  "capabilities": [
    {
      "platformVersion": "26",
      "maxInstances": 1,
      "platformName": "Android",
      "automationName": "UiAutomator2",
      "deviceName": "Android Emulator"
    }
  ],
  "configuration": {
    "cleanUpCycle": 2000,
    "timeout": 30000,
    "proxy": "org.openqa.grid.selenium.proxy.DefaultRemoteProxy",
    "maxSession": 1,
    "register": true,
    "registerCycle": 5000,
    "hubPort": 4444,
    "hubHost": "127.0.0.1",
    "hubProtocol": "http"
  }
}
```

- nodeconfig-ios.json
    
```json
{
  "capabilities": [
    {
      "platformVersion": "11.4",
      "maxInstances": 1,
      "platformName": "iOS",
      "browserName": "Safari"
    }
  ],
  "configuration": {
    "cleanUpCycle": 2000,
    "timeout": 30000,
    "proxy": "org.openqa.grid.selenium.proxy.DefaultRemoteProxy",
    "maxSession": 1,
    "register": true,
    "registerCycle": 5000,
    "hubPort": 4444,
    "hubHost": "127.0.0.1",
    "hubProtocol": "http"
  }
}
```

Let's take a look at some of the important configuration keys:

- capabilities: the set of capabilities supported by this node. Can be a list. In this case, the node is only supporting one type of device. Note that in addition to the capabilities you're used to seeing, you can specify how many of a particular capability set the node should be allowed to start, via maxInstances.
- proxy: the proxy logic to be used for communicating with this node. You can write a custom proxy if desired.
- maxSession: the total number of sessions this node can run. This is useful in combination with maxInstances. For example, let's say we can run a total of 5 iPhone 8s and 5 iPhone 6s on this node, but the system gets overloaded when running more than 8 sessions at a time, of any kind. Then we'd set maxInstances to 5 for each device type, but maxSession to 8, so that we never try to run the theoretical max of 10.
- hubHost, hubPort, and hubProtocol: the connection details for the Grid hub server.

### Starting up the grid

```bash
# Window 1: the Grid hub
java -jar /path/to/selenium-server-standalone.jar -role hub
 
# Window 2: the iOS node
appium -p 4723 --nodeconfig /path/to/nodeconfig-ios.json
 
# Window 3: the Android node
appium -p 4733 --nodeconfig /path/to/nodeconfig-android.json
```
