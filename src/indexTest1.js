// Challenge One
// Import our SCSS and put it into a variable as a string

import css from './assets/scss/styleTest1.scss'
// Get a helper to make our style element
// import {
//   makeStyleElementString,
//   handleLoadFailure,
//   retryTest,
// } from '../lib/optimisation-helpers/dist'

import {
  isInViewport,
  waitForElm,
  isMobile,
  retryTest,
  handleLoadFailure,
  makeStyleElementString,
  numberArr,
} from './helpers'

// Get our HTML style element as a string to insert wherever
const styleElementString = makeStyleElementString(css.toString())

// IIFE to initialise the test and catch any errors
;(function init(tries = 0) {
  try {
    // If this is an iFrame exit -- prevents our tests from appearing in iFrames
    if (window.location.href.includes('?sidebar=true')) return
    // if we have tried to load more than X times we failed
    if (tries > 5) return handleLoadFailure()
    // Add some logic to check for a target here and then retry
    if (!document.body) return retryTest(init, 500, tries + 1)
    if (!document.querySelector('#add-to-cart-button'))
      return retryTest(init, 500, tries + 1)
    // console.log('should run')
    // Add our css element string to the end of the document body
    document.body.insertAdjacentHTML('beforeend', styleElementString)
  } catch (e) {
    console.error(e)
  } finally {
    // Do some cleanup up
  }

  ;(function () {
    // if it is a mobile screen
    if (isMobile()) {
      // add to bag sticky CTA
      const addToBagSticky = () =>
        `<div class = "addBagWrapper">
         <div class = "innerContent">
         <div class = "selectWrapper">
         <select class="selectNumber">
         ${numberArr
           .map(
             (num) => `
          <option class="selectSize">${num}</option>`
           )
           .join('')}
         </select>
         </div>
         <button class="addBagButton">ADD</button>
         </div>
         </div> `

      // insert CTA onto page
      document.body.insertAdjacentHTML('beforeend', addToBagSticky())

      // amazon add to cart button
      const amazonAddToCart = () =>
        document.querySelector('#add-to-cart-button')

      // CTA add to bag button
      const addToBagButton = () => document.querySelector('.addBagButton')

      // click amazon add to bag when CTA add to bag is clicked
      addToBagButton().addEventListener('click', () => {
        amazonAddToCart().click()
        // change dropdown value back to 1
        document.querySelector('.selectNumber').value = 1
      })

      // CTA wrapper element
      const addBagWrapper = () => document.querySelector('.addBagWrapper')

      // amazon droo down container
      const amazonDropDownContainer = () =>
        document.querySelector('#mobileQuantitySelection')

      // in stock message element
      const inStockMsg = () =>
        document.querySelector('#availabilityInsideBuyBox_feature_div')

      // amazon drop down selector element
      const amazonDropDownSelector = () =>
        document.querySelector(
          '.a-native-dropdown.a-declarative.mobileQuantityDropDown'
        )

      // scroll function that looks for whether elements are in viewport
      document.addEventListener('scroll', function () {
        // if amazon add to cart is in view add class to hide CTA
        if (isInViewport(amazonAddToCart())) {
          addBagWrapper().classList.add('hideWrapper')
        } else {
          addBagWrapper().classList.remove('hideWrapper')
        }
        // if instock message is in view revert the amazon drop down to initial position
        if (isInViewport(inStockMsg())) {
          console.log('in view')
          amazonDropDownContainer().classList.add('initialPosition')
        } else {
          amazonDropDownContainer().classList.remove('initialPosition')
        }
      })

      // const popover = () => document.querySelector('.a-popover-wrapper')

      // CTA drop down element
      const selectNumber = () => document.querySelectorAll('.selectNumber')

      // function that listens for an input on the CTA dropdown
      selectNumber().forEach((el) =>
        el.addEventListener('input', () => {
          // converts the number selected into a number type
          const numberSelected = Number(el.options[el.selectedIndex].value)
          // console.log(numberSelected, amazonDropDownSelector())

          // clicks amazon drop down to open up quantity popover
          amazonDropDownSelector().click()

          const addStyle = `<style class="hide-popup">.a-popover-wrapper, #a-popover-lgtbox {visibility: hidden;}</style>`
          document.body.insertAdjacentHTML('beforeBegin', addStyle)
          

          // variable that stores all values from popover quantity selector
          const popoverDropdown = () =>
            document.querySelectorAll(
              '.a-popover.a-dropdown.a-dropdown-common.a-declarative .a-popover-wrapper .a-nostyle.a-list-link .a-dropdown-item'
            )

          // function that waits for element to appear on page
          waitForElm(
            '.a-popover.a-dropdown.a-dropdown-common.a-declarative .a-popover-wrapper '
          )
            .then(() => {
              console.log('Element is ready')
            })
            .then(() => {
              // convert popover quantity elements into array
              const popoverArr = () => Array.from(popoverDropdown())

              // filter function that returns the element that matches to the quantity selected on CTA
              const popoverEl = () =>
                popoverArr().filter((el) => {
                  const numb = () => Number(el.firstElementChild.textContent)
                  return numb() === numberSelected
                })

              // clicks the element from filter function to select correct quantity
              popoverEl()[0].firstElementChild.click()

              // variable that sets first time as false
              let firstTime = false

              // popover close button element
              const popoverClose = () =>
                document.querySelector('.a-button-close.a-declarative')

                

              // timeout function that closes the popover after a second
              setTimeout(function () {
                firstTime = true
                popoverClose().click()
                document.querySelector('.hide-popup').remove()
              }, 1000)

             

              // sets first time variable as true if false and timeout function that executes the click after 0.5 seconds
              if (!firstTime) {
                setTimeout(function () {
                  firstTime = true
                  popoverEl()[0].firstElementChild.click()
                }, 500)
                popoverClose().click()
              }
               
            })
        })
      )
    }
  })()
})()
