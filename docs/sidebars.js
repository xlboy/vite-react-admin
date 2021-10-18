/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  toolChainSidebar: [{ type: 'autogenerated', dirName: 'tool-chain' }],
  guideSidebar: [{ type: 'autogenerated', dirName: 'guide' }],
  guideAdvancedSidebar: [
    {
      type: 'category',
      label: '进阶',
      items: [{ type: 'autogenerated', dirName: 'guide/advanced' }]
    }
  ]
  // mySidebar: [
  //   {
  //     label: "快速入门",
  //     // items: ['doc1'],
  //     // items: ['tool-chain/index'],
  //   },
  //   {
  //     type: "category",
  //     label: "Docusaurus",
  //     items: [],
  //     // items: ['doc2', 'doc3'],
  //   },
  // ],

  // But you can create a sidebar manually

  // tutorialSidebar: [
  //   {
  //     type: 'category',
  //     label: 'Tutorial',
  //     items: ['intro'],
  //   },
  // ],
};
