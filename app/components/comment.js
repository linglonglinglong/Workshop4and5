import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeComment} from '../server';
import {unlikeComment} from '../server';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }
  /**
    * Triggered when the user clicks on the 'like' or 'unlike' button.
    */
   handleLikeClick(clickEvent) {
     // Stop the event from propagating up the DOM tree, since we handle it here.
     // Also prevents the link click from causing the page to scroll to the top.
     clickEvent.preventDefault();

     if (clickEvent.button === 0) {
       // Callback function for both the like and unlike cases.
       var callbackFunction = (updatedLikeCounter) => {
         this.setState({likeCounter: updatedLikeCounter});
       };

       if (this.didUserLike()) {
         // User clicked 'unlike' button.
         unlikeComment(this.props.id, this.props.feedItemId, 4, callbackFunction);
       } else {
         // User clicked 'like' button.
         likeComment(this.props.id, this.props.feedItemId, 4, callbackFunction);
       }
     }
   }

   /**
    * Returns 'true' if the user liked the item.
    * Returns 'false' if the user has not liked the item.
    */
   didUserLike() {
     var likeCounter = this.state.likeCounter;
     var liked = false;
     // Look for a likeCounter entry with userId 4 -- which is the
     // current user.
     for (var i = 0; i < likeCounter.length; i++) {
       if (likeCounter[i]._id === 4) {
         liked = true;
         break;
       }
     }
     return liked;
   }

  render() {
    var likeButtonText = "Like";
    if (this.didUserLike()) {
      likeButtonText = "Unlike";
    }

    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link> {this.props.children}
          <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}> {likeButtonText}
          </a> · <a href="#">Reply</a> ·
            {unixTimeToString(this.props.postDate)}
        </div>
      </div>
    )
  }
}
