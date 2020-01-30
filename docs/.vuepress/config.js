module.exports = {
  title: 'Vue Router Middleware Plugin',
  description: 'The vue router middleware pipeline you deserve',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/dsfx3d/vue-router-middleware-plugin'}
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            '',
            'quickstart'
          ]
        },
        {
          title: 'Advanced',
          collapsable: false,
          children: [
            'configurations',
            'context',
            'middlewares'
          ]
        }
      ],
      '/api/': [
        {
          title: 'API Reference',
          collapsable: false,
          children: [
            '',
            'context',
            'helpers'
          ]
        }
      ]
    }
  }
}
