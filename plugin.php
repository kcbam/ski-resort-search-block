<?php
/**
 * Plugin Name: Ski Resort Search Block - Gutenberg Block Plugin
 * Plugin URI: https://github.com/kcbam/ski-resort-search-block
 * Description: Ski Resort Search Block — It is a custom Gutenberg plugin created via create-guten-block. With the help of this plugin we can search the Norway Ski resort information. Simple type the name in the search from of any resort in Norway.
 * Author: Bam Kadayat
 * Author URI: https://bamkadayat.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
