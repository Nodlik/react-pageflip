import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { PageFlip } from "page-flip";

export default class HTMLFlipBook extends React.Component {
  componentDidMount() {
    this.pageFlip = new PageFlip(this.el, this.props);
    this.pageFlip.loadFromHTML(this.childRef);

    if (this.props.onFlip)
      this.pageFlip.on("flip", (e) => this.props.onFlip(e));

    if (this.props.onChangeOrientation)
      this.pageFlip.on("changeOrientation", (e) =>
        this.props.onChangeOrientation(e)
      );

    if (this.props.onChangeState)
      this.pageFlip.on("changeState", (e) => this.props.onChangeState(e));
  }

  componentWillUnmount() {
    this.pageFlip.destroy();
    this.pageFlip = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.pageFlip.updateFromHtml(this.childRef);
    }
  }

  getPageFlip() {
    return this.pageFlip;
  }

  render() {
    this.childRef = [];

    const childWithRef = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        ref: (dom) => {
          if (dom) this.childRef.push(dom);
        },
      });
    });

    return <div ref={(el) => (this.el = el)}>{childWithRef}</div>;
  }
}