(function () {
  'use strict'

  angular
    .module('notesee')
    .factory('Notes', Notes)

  function Notes () {
    return [
      {
        author: 'merktassel',
        attachment: {
          link: 'http://farm1.static.flickr.com/206/494124881_487c4a01f3.jpg'
        },
        classroom: 'MKS35',
        tags: ['promises', 'async'],
        timestamp: Date.now()
      },
      {
        author: 'dthai92',
        attachment: {
          link: 'http://www.sugarresearch.com.au/content/FlippingBooks/Soil-specific%20Management%20Guidelines%20in%20the%20Herbert%20District/files/assets/common/page-substrates/page0014.jpg'
        },
        classroom: 'HR2',
        tags: ['callbacks', 'async', 'node'],
        timestamp: Date.now()
      },
      {
        author: 'mtham7697',
        attachment: {
          link: 'http://partnersinexcellenceblog.com/wp-content/uploads/2011/08/handwritten-letter0002-791x1024.jpg'
        },
        classroom: 'HR2',
        tags: ['this', 'bind', 'call', 'apply'],
        timestamp: Date.now()
      },
      {
        author: 'chrisdabiss',
        attachment: {
          link: 'http://margaretshepherd.com/images/bk_hand.jpg'
        },
        classroom: 'MKS35',
        tags: ['objects', 'prototypes', 'inheritance'],
        timestamp: Date.now()
      }
    ]
  }
})()
