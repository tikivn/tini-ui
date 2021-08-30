<p align="center">
  <img src="https://tiniapp-media.tikicdn.com/tiniapps/files/images/tini.png" style="zoom: 0.2;" width="128" />
</p>

<h3 align="center">
  <a href="https://developers.tiki.vn/docs/developer/getting-started">Getting Started</a>
  <span> · </span>
  <a href="https://developers.tiki.vn/docs/framework/overview">Framework</a>
  <span> · </span>
  <a href="https://developers.tiki.vn/docs/studio/overview">Studio</a>
  <span> · </span>
  <a href="https://community.tiki.vn">Community</a>
</h3>

# [Tini UI](https://developers.tiki.vn/docs/component/overview)

The Tini App design team builds a design system for the Tini App Platform based on the Tiki design system with the name Tini UI. The Tini Design System will help product designers/ developers to uniform the user interfaces to focus on a better user experience, deliver ideas and products faster.

Tini UI includes 2 packages: [tini-ui](https://developers.tiki.vn/docs/component/advance/actions/button) and tini-style.

## Install

Use npm

```bash
$ npm install @tiki.vn/tini-ui --save
```

Use yarn

```bash
$ yarn add @tiki.vn/tini-ui
```

## How to use

Register the component into `.json` config file

```json
{
  "usingComponents": {
    "avatar": "@tiki.vn/tini-ui/es/avatar/index"
  }
}
```

Then you can use it as normal component:

```xml
<avatar name="Tini UI" size="lg" shape="circle" src="https://salt.tikicdn.com/ts/miniapp/d6/21/86/89cc2b8a2f930bb5f0f269c0374a3230.png"/>
/>
```

## Contribute

If you have any issues or suggestions, please send us [issue](https://github.com/tikivn/tini-ui/issues)

## Resources

- [Introducing about Tini Framework](https://developers.tiki.vn/docs/framework/overview)
- [Tini Apps Example](https://github.com/tikivn/miniapp-getting-started)
