module.exports = function (RED) {
  function PuppeteerPageClick (config) {
    RED.nodes.createNode(this, config)
    this.selector = config.selector
    var node = this
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        node.selector = config.selectortype=="msg"?msg[node.selector]:node.selector
        node.selector = config.selectortype=="flow"?flowContext.get(node.selector):node.selector
        node.selector = config.selectortype=="global"?globalContext.get(node.selector):node.selector
      await msg.puppeteer.page.waitForSelector(node.selector)
      await msg.puppeteer.page.click(node.selector)
      node.send(msg) 
      } catch(err) {
          node.error(err)
      }
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-click', PuppeteerPageClick)
}
