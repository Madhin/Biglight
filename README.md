# Biglight-Challenges

Challenge 1: My approach to this test was to replicate the click on the Amazon quantity drop down. The click allows for the popover quantity selector to appear, which allows you to change the quantity selected. The element clicked to change the quantity to the required amount is targeted by filtering the elements by the value of its content, which is mirrored to the quantity selected in the CTA. The add to bag button on the CTA replicates the click of the Amazon add to bag button. There were a couple of difficulties to this test, namely that the popover element did not exist until the click of the Amazon dropdown, and that the click would not fire at all unless the Amazon drop down was in the viewport. In order to address these issues, I included a Promise function that fires after the element appears and also to move the Amazon selector to stay in the viewport as the customer scrolls.

#################################################

Challenge 2: My approach to this challenge was to insert the promo block after the first listed item. In order to get the promo block to remain in position after the use of the filters a Mutation Observer is added. This observes changes to the listed items container and re-adds the promo block back in on to its correct position.

################################################

Just a quick note to say I have compiled my code using Webpack which I have then inserted into the code injector extension. The file path for the uncompiled code sits in the src folder (indexTest1 & indexTest2). The SCSS sits in the assets folder within src. The compiled code sits in the dist folder (test1.js & test2.js) alongside the compiled CSS from the SCSS files.
