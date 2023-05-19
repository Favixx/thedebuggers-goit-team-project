export const keys = {
    KEYS: [
        {
            public:'c9193a7afd018df1ebb0b85c6cadc702',
            private:'b6937bfb420ece5e2f5c69671b91e96ac9158c8f'
        },
        {
            public:'0498998f2a8f5ed7c036ed9f1738767d',
            private:'4fca95a0c70d4f7428c5513f5c2fe09a131468c3'
        },
        {
            public:'e8d87ed088b5013742a2a9466816b30e',
            private:'dbde977f898ea7131460b979ad9d4adf2e774ce4'
        },
        {
            public:'4e08d3f6171be22b48ed8ee04bb4125c',
            private:'5f03d2988d249cc23a445df17bc7213b17a75fff'
        },
        {
            public:'80ffeb6fa5691a33f33e64431c6d9989',
            private:'c6c470899aecedfc1c5215fc7096b67431ebdc43'
        },
        {
            public:'414d2b9c97e644b2f86a965c34d5b1a4',
            private:'4c0a37363b1998b7d594006101a7f89325d99ab1'
        }
    ],
    keyIsLoaded: false,
    LOCAL_KEY: 'keyId',
    keyID: localStorage.getItem('keyId') ? (Number(localStorage.getItem('keyId')) > 5) ? 0 : Number(localStorage.getItem('keyId')) : 0,
    getNextKey(){
        if (this.keyIsLoaded) return null;
        if(this.keyID >= this.KEYS.length) {
            this.keyID = 0;
            localStorage.setItem(this.LOCAL_KEY, this.keyID)
            return null;
        }
        this.keyID += 1;
        localStorage.setItem(this.LOCAL_KEY, this.keyID)
        this.keyIsLoaded = true;
        return true;
    },
    getPublicKey(){
        return this.KEYS[this.keyID].public
    },
    getPrivateKey(){
        return this.KEYS[this.keyID].private
    }
}