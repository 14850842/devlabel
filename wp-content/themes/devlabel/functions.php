<?php
/* PPM Functions */

add_action( 'wp_enqueue_scripts', 'ppm_scripts_and_styles', 999 );

function ppm_scripts_and_styles() {
    global $wp_styles; // call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way
    global $brew_options;
    if (!is_admin()) {

        wp_register_script( 'third-party', get_stylesheet_directory_uri() . '/includes/js/third-party.js', array('jquery'), '3.0.0',true);
        wp_register_script( 'ppm', get_stylesheet_directory_uri() . '/includes/js/ppm.js', array('third-party','jquery'), '3.0.0',true);
        
        

        wp_enqueue_script('third-party');

        wp_enqueue_script('ppm');



    }
}

add_image_size('blog-image',266,266,true);

function child_sections($sections){
    //$sections = array();
    $sections[] = array(
        'icon'          => 'ok',
        'icon_class'    => 'fa fa-gears',
        'title'         => __('Theme Options', 'peadig-framework'),
        'desc'          => __('<p class="description">Theme modifications</p>', 'ppm'),
        'fields' => array(
                array(
                        'id'=>'site_logo',
                        'type' => 'media', 
                        'url'=> true,
                        'title' => __('Site Logo', 'ppm'),
                        'compiler' => 'true',
                        //'mode' => false, // Can be set to false to allow any media type, or can also be set to any mime type.
                        'desc'=> __('Select main logo from media gallery', 'ppm'),
                        'default'=>array('url'=>'http://s.wordpress.org/style/images/codeispoetry.png'),
                        ),
                array(
                        'id'=>'site_logo_1',
                        'type' => 'media', 
                        'url'=> true,
                        'title' => __('Site Logo Inverse', 'ppm'),
                        'compiler' => 'true',
                        //'mode' => false, // Can be set to false to allow any media type, or can also be set to any mime type.
                        'desc'=> __('Select inverseo logo from media gallery', 'ppm'),
                        'default'=>array('url'=>'http://s.wordpress.org/style/images/codeispoetry.png'),
                        ),
                array(
                        'id'=>'site_favicon',
                        'type' => 'media', 
                        'url'=> true,
                        'title' => __('Site Icon', 'ppm'),
                        'compiler' => 'true',
                        //'mode' => false, // Can be set to false to allow any media type, or can also be set to any mime type.
                        'desc'=> __('Add a website icon', 'ppm'),
                        'default'=>array('url'=>'http://s.wordpress.org/style/images/codeispoetry.png'),
                        ),  
        )
    );

     $sections[] = array(
        'icon'          => 'ok',
        'icon_class'    => 'fa fa-heart',
        'title'         => __('Social Profiles', 'ppm-framework'),
        'desc'          => __('<p class="description">Social Network URLS</p>', 'ppm'),
        'fields' => array(
           
            array(
                        'id'=>'twitter_url',
                        'type' => 'text',
                        'title' => __('Twitter', 'redux-framework-demo'),
                        'desc' => __('Enter your twitter handle', 'redux-framework-demo'),
                        ),  
            array(
                        'id'=>'googleplus_url',
                        'type' => 'text',
                        'title' => __('Google Plus', 'redux-framework-demo'),
                        'desc' => __('Enter your Google+ url', 'redux-framework-demo'),
                        ),  
            array(
                        'id'=>'address',
                        'type' => 'textarea',
                        'title' => __('Address', 'redux-framework-demo'),
                        'desc' => __('Enter your business address', 'redux-framework-demo'),
                        ),    
             array(
                        'id'=>'telephone',
                        'type' => 'textarea',
                        'title' => __('Telephone Numebrs', 'redux-framework-demo'),
                        'desc' => __('Enter your business telephone numbers', 'redux-framework-demo'),
                        ),
            array(
                    'id'=>'email',
                    'type' => 'text',
                    'title' => __('Email Address', 'redux-framework-demo'),
                    'desc' => __('Enter your business email address', 'redux-framework-demo'),
                    ),   
        )
    );

    return $sections;
}

register_nav_menus( array( 'secondary-nav' => __( 'Secondary Nav', 'woothemes' ) ) );
// Secondary Nav
function secondary_nav() {
    // display the wp3 menu if available
    wp_nav_menu(array(
        'container' => false,                                       // remove nav container
        'container_class' => 'menu clearfix',                       // class of container (should you choose to use it)
        'menu' => __( 'The Main Menu', 'bonestheme' ),              // nav name
        'menu_class' => 'nav navbar-nav navbar-right',              // adding custom nav class
        'theme_location' => 'secondary-nav',                             // where it's located in the theme
        'before' => '',                                             // before the menu
      'after' => '',                                            // after the menu
      'link_before' => '',                                      // before each link
      'link_after' => '',                                       // after each link
      'depth' => 2,                                             // limit the depth of the nav
      'fallback_cb' => 'wp_bootstrap_navwalker::fallback',  // fallback
        'walker' => new wp_bootstrap_navwalker()                    // for bootstrap nav
    ));
} /* end bones main nav */

add_filter( 'cmb_meta_boxes', 'cmb_sample_metaboxes' );
/**
 * Define the metabox and field configurations.
 *
 * @param  array $meta_boxes
 * @return array
 */
function cmb_sample_metaboxes( array $meta_boxes ) {

    // Start with an underscore to hide fields from custom fields list
    $prefix = '_ppm_';
    $meta_boxes['service_metabox'] = array(
            'id'         => 'service_metabox',
            'title'      => __( 'Page Options', 'cmb' ),
            'pages'      => array( 'page', ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true, // Show field names on the left
            // 'cmb_styles' => true, // Enqueue the CMB stylesheet on the frontend
            'fields'     => array(
                array(
                    'name' => __( 'Page Sub Heading', 'cmb' ),
                    'desc' => __( 'enter the main page sub heading', 'cmb' ),
                    'id'   => $prefix . 'sub_heading',
                    'type' => 'text',
                ),
                array(
                    'name' => __( 'Key Words', 'cmb' ),
                    'desc' => __( 'enter the key words that you want', 'cmb' ),
                    'id'   => $prefix . 'key_words',
                    'type' => 'text',
                ),
            )
        );

 $meta_boxes['team_metabox'] = array(
            'id'         => 'team_metabox',
            'title'      => __( 'Team Options', 'cmb' ),
            'pages'      => array( 'team-member', ), // Post type
            'context'    => 'normal',
            'priority'   => 'high',
            'show_names' => true, // Show field names on the left
            // 'cmb_styles' => true, // Enqueue the CMB stylesheet on the frontend
            'fields'     => array(
                array(
                    'name' => __( 'Facebook', 'cmb' ),
                    'desc' => __( 'enter the url of social network', 'cmb' ),
                    'id'   => $prefix . 'social_network_1',
                    'type' => 'text_url',
                ),
                array(
                    'name' => __( 'Twitter', 'cmb' ),
                    'desc' => __( 'enter the url of social network', 'cmb' ),
                    'id'   => $prefix . 'social_network_2',
                    'type' => 'text_url',
                ),
                array(
                    'name' => __( 'Pinterest', 'cmb' ),
                    'desc' => __( 'enter the url of social network', 'cmb' ),
                    'id'   => $prefix . 'social_network_1',
                    'type' => 'text_url',
                ),
                array(
                    'name' => __( 'LinkedIn', 'cmb' ),
                    'desc' => __( 'enter the url of social network', 'cmb' ),
                    'id'   => $prefix . 'social_network_2',
                    'type' => 'text_url',
                ),
                array(
                    'name' => __( 'GitHub', 'cmb' ),
                    'desc' => __( 'enter the url of social network', 'cmb' ),
                    'id'   => $prefix . 'social_network_1',
                    'type' => 'text_url',
                ),
                array(
                    'name' => __( 'Behance', 'cmb' ),
                    'desc' => __( 'enter the url of social network', 'cmb' ),
                    'id'   => $prefix . 'social_network_2',
                    'type' => 'text_url',
                ),
                array(
                    'name' => __( 'Dribble', 'cmb' ),
                    'desc' => __( 'enter the url of social network', 'cmb' ),
                    'id'   => $prefix . 'social_network_1',
                    'type' => 'text_url',
                ),
            )
        );

    return $meta_boxes;
}


  add_filter('redux/options/brew_options/sections', 'child_sections');





// add_filter( 'woothemes_our_team_member_fields', 'my_new_fields' );
// function my_new_fields( $fields ) {
//     $fields['Facebook'] = array(
//         'name' => __( 'Facebook', 'our-team-by-woothemes' ),
//         'description' => __( '', 'our-team-by-woothemes' ),
//         'id'   => $prefix . 'facebookurl',
//         'type' => 'text_url',
//     // 'protocols' => array( 'http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet' ), // Array of allowed protocols
//         'default' => '',
//         'section' => 'info'
//     );
//     $fields['Twitter'] = array(
//         'name' => __( 'Twitter', 'our-team-by-woothemes' ),
//         'description' => __( '', 'our-team-by-woothemes' ),
//         'type' => 'text_url',
//         'default' => '',
//         'section' => 'info'
//     );
//     $fields['Pinterest'] = array(
//         'name' => __( 'Pinterest', 'our-team-by-woothemes' ),
//         'description' => __( '', 'our-team-by-woothemes' ),
//         'type' => 'text_url',
//         'default' => '',
//         'section' => 'info'
//     );
//     $fields['LinkedIn'] = array(
//         'name' => __( 'LinkedIn', 'our-team-by-woothemes' ),
//         'description' => __( '', 'our-team-by-woothemes' ),
//         'type' => 'text_url',
//         'default' => '',
//         'section' => 'info'
//     );
//     $fields['GitHub'] = array(
//         'name' => __( 'GitHub', 'our-team-by-woothemes' ),
//         'description' => __( '', 'our-team-by-woothemes' ),
//         'type' => 'text_url',
//         'default' => '',
//         'section' => 'info'
//     );
//     $fields['Behance'] = array(
//         'name' => __( 'Behance', 'our-team-by-woothemes' ),
//         'description' => __( '', 'our-team-by-woothemes' ),
//         'type' => 'text_url',
//         'default' => '',
//         'section' => 'info'
//     );
//     $fields['Dribble'] = array(
//         'name' => __( 'Dribble', 'our-team-by-woothemes' ),
//         'description' => __( '', 'our-team-by-woothemes' ),
//         'type' => 'text_url',
//         'default' => '',
//         'section' => 'info'
//     );
//     return $fields;
// }



