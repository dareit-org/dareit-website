import { Component } from 'preact';
import style from './style.scss';
import classNames from 'classnames';
import transitionEvent from '../../helpers/transitionEventHelper';

export default class Accordion extends Component {
  state = {
    isOpened: false
  }

  getContentRef = ref => this.content = ref;
  getInnerContentRef = ref => this.innerContent = ref;

  handleCollapsibleClick = () => {
    this.content.style.height = `${this.content.offsetHeight}px`;
    const shouldOpen = !this.state.isOpened

    requestAnimationFrame(() => {
      this.content.style.height = shouldOpen ? `${this.innerContent.offsetHeight}px` : 0;
      this.setState({ isOpened: shouldOpen });
    });
  }

  componentDidMount() {
    this.content.addEventListener(transitionEvent, () => {
      if (this.state.isOpened) {
        this.content.style.height = 'auto';
      }
    });
  }

  render() {
    const { question, answer } = this.props;

    const accordionClass = classNames(style.accordion__item, {
      [style['accordion__item--active']]: this.state.isOpened
    });

    return (
      <li class={accordionClass}>
        <div class={style.accordion__header} onClick={this.handleCollapsibleClick}>
          <button type="button" class={style.accordion__button} />

          <p>{question}</p>
        </div>

        <div class={style.accordion__body} ref={this.getContentRef} >
          <div class={style['accordion__body-content']} ref={this.getInnerContentRef} >
            {answer}
          </div>
        </div>
      </li>
    );
  }
}
