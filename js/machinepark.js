const options = ['frezen', 'draadvonken', 'laserlassen', 'zinkvonken', 'vlakslijpen', 'spuitgieten']
const html = {
  'frezen': `<div class="selected-title">
  frezen
</div>
<div class="selected-unit">
  <div class="selected-unit-title">
      3-assig
  </div>
  <div class="selected-unit-content">
      <div class="selected-unit-content-machine">Deckel-Maho DMU 80T X800 – Y600 – Z600
      </div>
      <div class="selected-unit-content-machine">Deckel-Maho 70V X700 – Y500 – Z500</div>
  </div>
  <div class="selected-unit-title">
      5-assig
  </div>
  <div class="selected-unit-content">
      <div class="selected-unit-content-machine">Deckel-Maho DMU 50-evo X500 – Y450 – Z400
      </div>
      <div class="selected-unit-content-machine">Deckel-Maho DMC 75V linear X750 – Y600 –
          Z560
      </div>
      <div class="selected-unit-content-machine">DMG-MORI DMU 60-evo linear X600 – Y500 –
          Z500
      </div>
  </div>
</div>`,
  'draadvonken': `<div class="selected-title">
  draadvonken
</div>
<div class="selected-unit">
  <div class="selected-unit-content">
      <div class="selected-unit-content-machine">Charmilles Robofil 330F
      </div>
      <div class="selected-unit-content-machine">Agie Agiecut evolution 2</div>
      <div class="selected-unit-content-machine">Makino DUO64</div>
      <div class="selected-unit-content-machine">Charmilles HD 30 CNC (startgatvonken)</div>
  </div>
</div>`,
  'laserlassen': `<div class="selected-title">
laserlassen
</div>
<div class="selected-unit">
<div class="selected-unit-content">
    <div class="selected-unit-content-machine">OR-Laser LRS EVO</div>
</div>
</div>`,
  'zinkvonken': `<div class="selected-title">
zinkvonken
</div>
<div class="selected-unit">
<div class="selected-unit-content">
    <div class="selected-unit-content-machine">Charmilles Roboform 35</div>
    <div class="selected-unit-content-machine">Makino EDAF3</div>
</div>
</div>`,
  'vlakslijpen': `<div class="selected-title">
vlakslijpen
</div>
<div class="selected-unit">
<div class="selected-unit-content">
    <div class="selected-unit-content-machine">Jung HF50</div>
    <div class="selected-unit-content-machine">Jung JF520</div>
</div>
</div>`,
  'spuitgieten': `<div class="selected-title">
spuitgieten
</div>
<div class="selected-unit">
<div class="selected-unit-content">
    <div class="selected-unit-content-machine">Arburg 220S (25T)</div>
    <div class="selected-unit-content-machine">Arburg 320S (50T)</div>
    <div class="selected-unit-content-machine">Arburg 420C (100T)</div>
</div>
</div>`,
}

let selectedOption = 'frezen'

$(".option").click(function () {
  var index = $(this).index('.option');
  selectedOption = options[index]
  $('.option').each(function (i, obj) {
    $(this).attr("class", "option")
  });
  $(this).attr("class", "active option")
  $(".selected-wrapper").html(html[selectedOption])

  // Change background image
  $('.image-wrapper').css("background-image", `url(/winters/img/machinepark/100kb/${index + 1}.jpg)`);
  console.log("h")
})

$('.mobile-unit-title-wrapper').click(function () {

})

let heights = [0, 0, 0, 0, 0, 0]
let active = -1

function getHeightOfSelections() {
  $(".mobile-unit-content").each(function (i, obj) {
    heights[i] = $(this).height()
  })
  gsap.to('.mobile-unit-content', {
    display: 'none'
  })

  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 2000);

}

$('.mobile-unit-title-wrapper').click(function () {
  var index = $(this).index('.mobile-unit-title-wrapper');
  $('.mobile-image-wrapper').css("background-image", `url(/winters/img/machinepark/100kb/${index + 1}.jpg)`);

  if (index != active) {
    // $(this).children('.mobile-unit-title-plus').css('display', 'none')
    // $(this).children('.mobile-unit-title-minus').css('display', 'block')
    // New one needs to open the rest collapses

    active = index

    $(".mobile-unit-content").each(function (i, obj) {
      if (i == index) {
        $('.mobile-unit-title-plus').eq(i).css('display', 'none')
        $('.mobile-unit-title-minus').eq(i).css('display', 'block')
        const tl = gsap.timeline()
        tl.to(obj, {
          display: 'block',
          height: '0px',
          duration: 0.2,
        }, '-=1').to(obj, {
          height: heights[i]
        })
      } else {
        $('.mobile-unit-title-plus').eq(i).css('display', 'block')
        $('.mobile-unit-title-minus').eq(i).css('display', 'none')
        const tl = gsap.timeline()
        tl.to(obj, {
          height: '0px'
        }).to(obj, {
          display: 'none'
        })
      }
    })
  } else {
    // Collapse currenct active
    $(".mobile-unit-content").each(function (i, obj) {
      active = -1
      if (i == index) {
        $('.mobile-unit-title-plus').eq(i).css('display', 'block')
        $('.mobile-unit-title-minus').eq(i).css('display', 'none')
        const tl = gsap.timeline()
        tl.to(obj, {
          height: '0px'
        }).to(obj, {
          display: 'none'
        })
      }
    })
  }
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 2000);
})

getHeightOfSelections()


