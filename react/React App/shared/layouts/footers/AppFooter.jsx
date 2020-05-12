import React, { Component } from 'react';


class AppFooter extends Component {
    render() {
        return (
            <footer id="footer">
                <div className="container">
                     <div className="row">
                         <div className="col-sm-6">
                           <div className="copyright">
                              &copy; {new Date().getFullYear()} - Alternatives CourtLink
                          </div>
                       </div>
                       <div className="col-sm-6">
                           <div className="social">
                              <ul>
                                  <li><a href="https://www.facebook.com/altincbillings" className="facebook" target="_blank;"><i className="fa fa-facebook"></i></a></li>
                                  <li><a href="https://www.youtube.com/channel/UCHai-6CGHHrser4-QDK4xPw" className="youtube" target="_blank;"><i className="fa fa-youtube"></i></a></li>
                              </ul>
                          </div>
                       </div>
                   </div>
                </div>
            </footer>
        )
    }
}

export default AppFooter;