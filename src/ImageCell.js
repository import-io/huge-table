import React from 'react';
import Portal from 'react-portal';
import * as Constants from './constants';


export class ImageCell extends React.Component {
  static propTypes = {
    cellData: React.PropTypes.object.isRequired,
    width: React.PropTypes.number.isRequired,
    mixedContentImage: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      showPopover: false,
    };
  }

  handleMouseEnter(e) {
    const clientRect = e.target.getBoundingClientRect();

    this.setState({
      showPopover: true,
      popoverTop: (clientRect.top + clientRect.bottom) / 2,
      popoverLeft: clientRect.left + this.props.width - 20,
    });
  }

  handleMouseLeave() {
    this.setState({
      showPopover: false,
    });
  }

  handleImageLoaded() {
    // Treat 5x5 pixels as less as visually meaningless
    // load about:blank to show the alt text instead
    if (this.refs.img.width * this.refs.img.height <= 25) {
      this.refs.img.src = 'about:blank';
    }
  }

  render() {
    const cellData = this.props.cellData;
    let imageUrl, href, alt;

    if (cellData.main && typeof cellData.main === 'object') {
      imageUrl = cellData.main.src;
      href = cellData.main.href || imageUrl;
      alt = cellData.alt || cellData.main.alt;

    } else {
      imageUrl = cellData.main;
      href = cellData.main;
      alt = cellData.alt || cellData.main;
    }

    if (this.props.mixedContentImage) {
      imageUrl =  this.props.mixedContentImage(imageUrl);
    }

    return (
      <a
        href={href}
        title={alt}
        target="_blank"
        style={{
          display: 'inline-block',
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          ref='img'
          className="example-image"
          src={imageUrl ? imageUrl : null}
          style={{
            maxHeight: Constants.ROW_HEIGHT - 10,
            maxWidth: this.props.width - 20,
            minHeight: 5,
            minWidth: 5,
          }}
          title={alt}
          alt={alt ? alt : 'Image'}
          onLoad={this.handleImageLoaded.bind(this)}

        />
        <Portal isOpened={!!(imageUrl && this.state.showPopover)}>
          <div className="popover fade right in" style={{
            display: 'block',
            position: 'absolute',
            top: this.state.popoverTop,
            left: this.state.popoverLeft,
            transform: 'translateY(-50%)',
            backgroundColor: '#fff',
          }}>
            <div className="arrow" style={{top: '50%'}}></div>
            <div className="popover-content">
              <img
                style={{width: '100%'}}
                src={imageUrl}
                title={alt}
                alt={alt ? alt : 'Image'}
              />
              <span>{alt}</span>
            </div>
          </div>
        </Portal>
      </a>
    );
  }
}
