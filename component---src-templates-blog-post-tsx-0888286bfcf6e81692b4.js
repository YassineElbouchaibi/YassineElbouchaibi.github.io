(self.webpackChunkgatsby_starter_tailwind_mdx_blog=self.webpackChunkgatsby_starter_tailwind_mdx_blog||[]).push([[7],{254:function(e,t,r){"use strict";r.r(t);var o=r(7294),n=r(5444),l=r(6725),s=r(5441),a=r(1785);t.default=function(e){var t,r=e.data,u=e.location,i=r.mdx,c=(null===(t=r.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",p=r.previous,f=r.next;return o.createElement(s.Z,{location:u,title:c},o.createElement(a.pQ,{title:i.frontmatter.title,description:i.frontmatter.description||i.excerpt}),o.createElement("article",{itemScope:!0,itemType:"http://schema.org/Article"},o.createElement("header",{className:"grid grid-cols-blog"},o.createElement("h1",{className:"col-start-2 font-exo font-black text-skin-fg text-4xl md:text-6xl",itemProp:"headline"},i.frontmatter.title),o.createElement("p",{className:"col-start-2 font-yrsa text-skin-fg text-xl"},i.frontmatter.date)),o.createElement("section",{itemProp:"articleBody",className:"prose prose-xl mt-8 mx-auto"},o.createElement(l.MDXRenderer,null,i.body))),o.createElement("nav",{className:"mt-8 grid grid-cols-blog"},o.createElement("ul",{className:"col-start-2 text-lg flex flex-wrap justify-between"},o.createElement("li",null,p&&o.createElement(n.Link,{to:p.fields.slug,rel:"prev"},"← ",p.frontmatter.title)),o.createElement("li",null,f&&o.createElement(n.Link,{to:f.fields.slug,rel:"next"},f.frontmatter.title," →")))))}},6725:function(e,t,r){var o=r(3395);e.exports={MDXRenderer:o}},3395:function(e,t,r){var o=r(9213),n=r(3515),l=r(8416),s=r(7071),a=["scope","children"];function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var c=r(7294),p=r(4983).mdx,f=r(9480).useMDXScope;e.exports=function(e){var t=e.scope,r=e.children,l=s(e,a),u=f(t),x=c.useMemo((function(){if(!r)return null;var e=i({React:c,mdx:p},u),t=Object.keys(e),l=t.map((function(t){return e[t]}));return n(Function,["_fn"].concat(t,[""+r])).apply(void 0,[{}].concat(o(l)))}),[r,t]);return c.createElement(x,i({},l))}},3897:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o},e.exports.__esModule=!0,e.exports.default=e.exports},3405:function(e,t,r){var o=r(3897);e.exports=function(e){if(Array.isArray(e))return o(e)},e.exports.__esModule=!0,e.exports.default=e.exports},3515:function(e,t,r){var o=r(6015),n=r(9617);function l(t,r,s){return n()?(e.exports=l=Reflect.construct.bind(),e.exports.__esModule=!0,e.exports.default=e.exports):(e.exports=l=function(e,t,r){var n=[null];n.push.apply(n,t);var l=new(Function.bind.apply(e,n));return r&&o(l,r.prototype),l},e.exports.__esModule=!0,e.exports.default=e.exports),l.apply(null,arguments)}e.exports=l,e.exports.__esModule=!0,e.exports.default=e.exports},8416:function(e,t,r){var o=r(4062);e.exports=function(e,t,r){return(t=o(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},9617:function(e){e.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}},e.exports.__esModule=!0,e.exports.default=e.exports},9498:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},2281:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},9213:function(e,t,r){var o=r(3405),n=r(9498),l=r(6116),s=r(2281);e.exports=function(e){return o(e)||n(e)||l(e)||s()},e.exports.__esModule=!0,e.exports.default=e.exports},5036:function(e,t,r){var o=r(8698).default;e.exports=function(e,t){if("object"!==o(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!==o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)},e.exports.__esModule=!0,e.exports.default=e.exports},4062:function(e,t,r){var o=r(8698).default,n=r(5036);e.exports=function(e){var t=n(e,"string");return"symbol"===o(t)?t:String(t)},e.exports.__esModule=!0,e.exports.default=e.exports},8698:function(e){function t(r){return e.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,t(r)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},6116:function(e,t,r){var o=r(3897);e.exports=function(e,t){if(e){if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports}}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-0888286bfcf6e81692b4.js.map