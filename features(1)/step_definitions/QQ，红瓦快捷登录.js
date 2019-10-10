const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const { driver } = require('../support/web_driver');


Given(/^浏览到搜索网站 "([^"]*)"$/, async function(url) {
    await driver.get(url);
    await driver.manage().window().maximize()
});

When(/^首页点击登录按钮跳转到登录界面$/, async function () {
    await driver.findElement({ css:'body > div.video_box > div > div.main-content > div > div.click-me.clearfix > a.am-button.button-login'}).click()
});

Then(/^点击qq图标跳转到登录界面$/, async function () {
    await driver.findElement({ id:'QQlogin'}).click()
});

Then(/^点击账户密码登录，并输入账号与密码进行登录$/, async function () {
    await driver.switchTo().frame('ptlogin_iframe')
    await driver.findElement({ id:'switcher_plogin'}).click()
    await driver.findElement({ css:'#u'}).sendKeys('1224179738@qq.com')
    await driver.findElement({ css:'#p'}).sendKeys('dingtao666')
    await driver.findElement({ css:'#login_button'}).click()
    await driver.sleep(6000)

    // 断言
    await driver.switchTo().defaultContent()
    await driver.switchTo().frame('model')
    let restext = await driver.findElement({ css:'#tabs > li.current.created-tab > a'}).getText()
    const text = '我创建的'
    await console.log(restext)
    await assert.equal(restext,text)
});




Given(/^点击红瓦图标并跳转到对应界面$/, async function () {
    await driver.findElement({ id: 'hongwa' }).click()
});

When(/^输入账号密码并点击登录$/, async function () {
    await driver.findElement({ id: 'account' }).sendKeys('13764292625')
    await driver.findElement({ id:'password' }).sendKeys('123456')    
    await driver.findElement({ css:'#username > div > div:nth-child(5) > input'}).click()
    await driver.sleep(3000)

    // 断言
    await driver.switchTo().defaultContent()
    await driver.switchTo().frame('_DialogFrame_UserInfo')
    let resname = await driver.findElement({ xpath:'//*[@id="list1"]/a' }).getText()
    const name = '账号密码'
    await console.log('信息是:',resname)
    await assert.equal(resname, name)
    await driver.sleep(1000)
});