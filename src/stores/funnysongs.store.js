import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}`; 
const AppKEY =  `${import.meta.env.VITE_APPKey}`; 

export const useFunnySongsStore = defineStore({
    id: 'funnysongs',
    state: () => ({
        theSongs: {},
        oneSongg: {}
    }),
    actions: {
        async actOn( songgId, actVal ) {
            this.OneSongg = { loading: true};
            var thisUrl = `${baseUrl}/funnysong${actVal}/${songgId}`;
            console.log("actOn this thisUrl:", thisUrl);
            const Rezult = fetchWrapper.get(thisUrl)
            .then( oneSongg => { 
                this.oneSongg = oneSongg ; 
                console.log("ActOn rezult:",Rezult);
            })
            .catch(error => {
                this.oneSongg = { error: "error:" + error};
                console.log("--------- actOn catch", error);
            });
        },        
        async getOne( songId ) { 
            this.OneSongg = { loading: true};
            var thisURL = `${baseUrl}/funnysong/${songId}`;
            fetchWrapper.get(thisURL)
            .then( oneSonggg => { 
                this.oneSongg = oneSonggg ; 
                console.log("getOne rezult:", oneSonggg);
            })
            .catch(error => {
                this.oneSongg = { error: "error:" + error};
                console.log("========== getOne catch:");
            })
        },        
        async update( givenSongg ) {
            this.OneSongg = { loading: true };
            var thisURL = `${baseUrl}/genericpost/`;
            // Vue object to JSON is kinda wonky IMO - probably be a cleaner way??
            var payload = JSON.stringify(givenSongg._object.oneSongg);
            var UzerInfo = localStorage.getItem('loginTok');
            console.log("Update with:", thisURL, UzerInfo, payload);
            fetchWrapper.post(thisURL,
                {
                    "EntityTag": "SILS1_SillySongs", 
                    "PostType": "updateorcreate",
                    "PostDataJSON": payload,
                    "UserToken": UzerInfo
                } )            
            .then( oneSongg => {
                this.oneSongg = oneSongg
            })
            .catch(error => {
                this.oneSongg = { error }
            })
        },
     async getMany(givenThrottle) {
            this.theSongs = { loading: true };            
            if (!givenThrottle) { 
                givenThrottle = 5;
            }
            var thisURL = `${baseUrl}/funnysongs?recordrequest=` + givenThrottle;
            fetchWrapper.get(thisURL) 
                .then(theSongs => {
                    this.theSongs = theSongs;
                    console.log("got it:",theSongs);
                })
                .catch(theSongs => this.theSongs = null )
        }        
    }
});
