/* application specific logic */

import 'jquery';

import 'olm';

import 'focus-visible';

// We need to setup the jitsi-local-storage as early as possible so that we can start using it.
// NOTE: If jitsi-local-storage is used before the initial setup is performed this will break the use case when we use
// the  local storage from the parent page when the localStorage is disabled. Also the setup is relying that
// window.location is not changed and still has all URL parameters.
import './react/features/base/jitsi-local-storage/setup';
import conference from './conference';
import API from './modules/API';
import UI from './modules/UI/UI';
import keyboardshortcut from './modules/keyboardshortcut/keyboardshortcut';
import translation from './modules/translation/translation';

// Initialize Olm as early as possible.
if (window.Olm) {
    window.Olm.init().catch(e => {
        console.error('Failed to initialize Olm, E2EE will be disabled', e);
        delete window.Olm;
    });
}
window.addEventListener('message', handleMessage, false);
function handleMessage(e) {
    // debugger;
    console.log('handleMessage',e.data);    
    if(e.data && e.data.type && e.data.type=='add_member_group'){
        window.conversation_type = e.data.conversation_type;
        
        // document.getElementById('add_member_group').style.display = "flex";

    }else if(e.data && e.data.type && e.data.type=='change_profile_pic'){
        document.getElementById('dominantSpeakerAvatar').src= e.data.img;
        document.getElementById("dominantSpeakerAvatar").style.display = "inline";
    }
    else if(e.data && e.data.type && e.data.type=='call_link'){
        window.call_link= e.data.call_link;
    }

    // Reference to element for data display
    // var el = document.getElementById('display');
    // // Check origin
    // if ( e.origin === 'http://www.example.com' ) {
    //     // Retrieve data sent in postMessage
    //     el.innerHTML = e.data;
    //     // Send reply to source of message
    //     e.source.postMessage('Message received', e.origin);
    // }
}
window.APP = {
    API,
    conference,

    // Used by do_external_connect.js if we receive the attach data after
    // connect was already executed. status property can be 'initialized',
    // 'ready', or 'connecting'. We are interested in 'ready' status only which
    // means that connect was executed but we have to wait for the attach data.
    // In status 'ready' handler property will be set to a function that will
    // finish the connect process when the attach data or error is received.
    connect: {
        handler: null,
        status: 'initialized'
    },

    // Used for automated performance tests.
    connectionTimes: {
        'index.loaded': window.indexLoadedTime
    },

    keyboardshortcut,
    translation,
    UI
};

// TODO The execution of the mobile app starts from react/index.native.js.
// Similarly, the execution of the Web app should start from react/index.web.js
// for the sake of consistency and ease of understanding. Temporarily though
// because we are at the beginning of introducing React into the Web app, allow
// the execution of the Web app to start from app.js in order to reduce the
// complexity of the beginning step.
import './react';
