import React from "react";
import { PageFlip } from "page-flip";

export default class HTMLFlipBook extends React.Component {
  componentDidMount() {
    this.pageFlip = new PageFlip(this.el, this.props);

    this.pageFlip.loadFromHTML(this.childRef);
    this.setHandlers();
  }

  setHandlers() {
    if (this.props.onFlip)
      this.pageFlip.on("flip", (e) => this.props.onFlip(e));

    if (this.props.onChangeOrientation)
      this.pageFlip.on("changeOrientation", (e) =>
        this.props.onChangeOrientation(e)
      );

    if (this.props.onChangeState)
      this.pageFlip.on("changeState", (e) => this.props.onChangeState(e));

    if (this.props.onInit)
      this.pageFlip.on("init", (e) => this.props.onInit(e));

    if (this.props.onUpdate)
      this.pageFlip.on("update", (e) => this.props.onUpdate(e));
  }

  componentWillUnmount() {
    this.pageFlip.destroy();
    this.pageFlip = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.pageFlip.off("flip");
      this.pageFlip.off("changeOrientation");
      this.pageFlip.off("changeState");
      this.pageFlip.off("init");
      this.pageFlip.off("update");

      this.pageFlip.updateFromHtml(this.childRef);
      this.setHandlers();
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

    return React.createElement(
      "div",
      {
        ref: (el) => (this.el = el),
        className: this.props.className,
        style: this.props.style,
      },
      childWithRef
    );
  }
}