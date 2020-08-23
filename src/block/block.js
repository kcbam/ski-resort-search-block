/**
 * BLOCK: ski-resort-search-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import Custom block 
import ResortApi from './skiResortApi';
import ReactHtmlParser from "react-html-parser";
//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          
 */
registerBlockType('cgb/block-ski-resort-search-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Ski Resort Search Block'), // Block title.
	icon: 'search', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('ski-resort-search-block — CGB Block'),
		__('CGB Example'),
		__('create-guten-block'),
	],

	attributes: {
		searchResult: {
			type: 'string',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: ResortApi,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: (props) => {
		return (
			<div className={props.className}>
				{ReactHtmlParser(props.attributes.searchResult)}
			</div>
		);
	},
});
