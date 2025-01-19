import Component from '@glimmer/component';

export default class MainMenu extends Component {
	constructor(owner, args) {
		super(owner, args);
		this.item = args.item;
	}
}
