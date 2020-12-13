var videoElement;
var adsLoaded = false;
var adContainer;
var adDisplayContainer;
var adsLoader;
var adsManager;

// On window load, attach an event to the play button click
// that triggers playback on the video element
window.addEventListener('load', function(event) {
  videoElement = document.getElementById('video-element');
  initializeIMA();
  videoElement.addEventListener('play', function(event) {
    loadAds(event);
  });
});

window.addEventListener('resize', function(event) {
    if(adsManager) {
        var width = videoElement.clientWidth;
        var height = videoElement.clientHeight;
        adsManager.resize(width, height, google.ima.ViewMode.NORMAL);
      }
  });
  
  function initializeIMA() {
    adContainer = document.getElementById('ad-container');
    try {
        adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);
        board.classList.add('hide');
    } catch (e) {
        //when there is a ad blocker have an aletr to display it and reload
        messageTitleElement.classList.add('hide');
        alert('please disable you adblocker to play');
    }
    adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        onAdsManagerLoaded,
        false);
    adsLoader.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError,
        false);

    // Let the AdsLoader know when the video has ended
    videoElement.addEventListener('ended', function() {
    adsLoader.contentComplete();
    });

    var adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
        'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
        'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
        'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';

    // Specify the linear and nonlinear slot sizes. This helps the SDK to
    // select the correct creative if multiple are returned.
    adsRequest.linearAdSlotWidth = videoElement.clientWidth;
    adsRequest.linearAdSlotHeight = videoElement.clientHeight;
    adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
    adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight / 3;

    // Pass the request to the adsLoader to request ads
    adsLoader.requestAds(adsRequest);
  }
  
  function loadAds(event) {
    // Prevent this function from running on if there are already ads loaded
    if(adsLoaded) {
      return;
    }
    adsLoaded = true;
  
    // Prevent triggering immediate playback when ads are loading
    event.preventDefault();
  
    // Initialize the container. Must be done via a user action on mobile devices.
    videoElement.load();
    adDisplayContainer.initialize();

    var width = videoElement.clientWidth;
    var height = videoElement.clientHeight;
    try {
        adsManager.init(width, height, google.ima.ViewMode.NORMAL);
        adsManager.start();
    } catch (adError) {
        // Play the video without ads, if an error occurs
        videoElement.play();
    }
  }

  function onAdsManagerLoaded(adsManagerLoadedEvent) {
    // Instantiate the AdsManager from the adsLoader response and pass it the video element
    adsManager = adsManagerLoadedEvent.getAdsManager(
        videoElement);

    adsManager.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        onContentPauseRequested);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        onContentResumeRequested);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.LOADED,
        onAdLoaded);
  }

  function onContentPauseRequested() {
    videoElement.pause();
  }
  
  function onContentResumeRequested() {
    videoElement.play();
  }

  function onAdLoaded(adEvent) {
    var ad = adEvent.getAd();
    if (!ad.isLinear()) {
      videoElement.play();
    }
  }
  
  function onAdError(adErrorEvent) {
    // Handle the error logging.
    if(adsManager) {
      adsManager.destroy();
    }
  }
