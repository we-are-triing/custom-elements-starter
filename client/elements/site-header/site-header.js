class SiteHeader extends RootElement {
    constructor() {
        super();
        this.buildShadowRoot();
    }
}
const headerObj = {
    churchName: "The Church of Jesus Christ of Latter-day Saints",
    language: {
        code: "eng",
        name: "English"
    },
    location: {
        code: "us",
        name: "United States"
    },
    nav: {
        main: [
            {
                text: "Home",
                link: "http://lds.org/"
            },{
                text: "Scriptures and Study",
                sub: [
                    {
                        text:"Scriptures",
                        links: [
                            {
                                text: "Holy Bible",
                                link: ""
                            },{
                                text: "Book of Mormon",
                                link: ""
                            },{
                                text: "Doctrine and Covenants",
                                link: ""
                            },{
                                text: "Pearl of Great Price",
                                link: ""
                            }
                        ]
                    },{
                        text:"Prophetic Teachings",
                        links: [
                            {
                                text: "General Conference",
                                link: ""
                            },{
                                text: "Teachings of Presidents",
                                link: ""
                            },{
                                text: "Living Prophets and Church Leaders",
                                link: ""
                            }
                        ]
                    },{
                        text:"Learn More",
                        links: [
                            {
                                text: "Jesus Christ",
                                link: ""
                            },{
                                text: "Gospel Topics",
                                link: ""
                            },{
                                text: "Church History",
                                link: ""
                            },{
                                text: "Education",
                                link: ""
                            }
                        ]
                    }
                ]
            },{
                text: "Families and Individuals",
                link: ""
            },{
                text: "Share the Gospel",
                link: ""
            },{
                text: "Inspiration and News",
                link: ""
            },{
                text: "Serve and Teach",
                link: ""
            }
        ]
    }
};

RootElement.registerElement('site-header', SiteHeader);
