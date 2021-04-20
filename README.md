<p align="center">
  <img src="https://salt.tikicdn.com/ts/miniapp/d6/21/86/89cc2b8a2f930bb5f0f269c0374a3230.png" style="zoom: 0.5;">
</p>

# Tiny UI

The MiniApp design team builds a design system for the MiniApp platform based on the Tiki design system with the name Tiny. The Tiny Design System will help product designers/ developers to uniform the user interfaces to focus on a better user experience, deliver ideas and products faster.

## Install

Use npm

```bash
$ npm install @tiki-miniapp/tiny-ui --save
```

Use yarn

```bash
$ yarn add @tiki-miniapp/tiny-ui
```

## How to use

Register the component into `.json` config file

```json
{
  "usingComponents": {
    "avatar": "tiny-ui/es/avatar/index"
  }
}
```

Then you can use it as normal component:

```xml
<avatar name="Tiny UI" size="lg" shape="circle" src="https://salt.tikicdn.com/ts/miniapp/d6/21/86/89cc2b8a2f930bb5f0f269c0374a3230.png"/>
/>
```

## Contribute

If you have any issues or suggestions, please send us [issue](https://github.com/tikivn/tiny-ui/issues)

## Resources

- [Introducing about MiniApp Framework](https://miniapp.tiki.vn/docs/framework/overview)
- [MiniApp Example](https://github.com/tikivn/miniapp-getting-started)
