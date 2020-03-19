import React from 'react'

const Footer = () => {

    var d = new Date();
    var year = d.getFullYear();

    return (
        <>
            <footer className="main-footer">
                {/* To the right */}
                <div className="float-right d-none d-sm-inline">
                     Anything you want
                </div>
                {/* Default to the left */}
                {/* eslint-disable-next-line */}
                <strong>Copyright {year} <a href="https://adminlte.io" target="_blank">organic world</a>.</strong> All rights reserved.
            </footer>
        </>
    )
}

export default Footer

