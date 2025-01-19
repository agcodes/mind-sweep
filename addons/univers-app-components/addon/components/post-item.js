import Component from '@glimmer/component';

export default class PostItem extends Component {
	constructor(owner, args) {
		super(owner, args);
		this.item = args.item;
	}
}