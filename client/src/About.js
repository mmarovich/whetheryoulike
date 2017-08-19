import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles/About.css'

export default class About extends Component {
    render() {
        return(
            <div className="about-container">
                <div className="purpose">
                    <h3>Purpose</h3>
                    <p>WhetherYouLike is a mobile app prototype that creates a customized
                        background for your mobile device.  You can switch on various information,
                        such as time, date, weather, and webcams, as well as change color themes
                        for both the background and elements.  After that, you have the ability
                        to drag those elements where ever you would like them to be on-screen.

                        This is more versatile than a typical widget, where you drag the widget around
                        within a 3 by 6 grid, effecting the position of your icons.  This sets the
                        background of your mobile device so that your icons and other widgets remain
                        where you want them.
                    </p>
                </div>
                <div className="goals">
                    <h3>Goals</h3>
                    <p>This project is going to be converted to the mobile app language of android
                        (React Native, and perhaps later on, Kotlin).  I can also see more elements and
                        options being added over time. As an example, temperature highs and lows for the
                        day, or record highs and lows from the past.  I'd also like to add a feature where
                        instead of a solid background, the user has the choice to upload a picture of their
                        choice.
                    </p>
                </div>
                <p className="go-back"><Link to="/settings">Go back</Link></p>
            </div>
        )
    }
}