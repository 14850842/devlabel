<?php
/*
Template Name: Home Page Template
*/
?>

<?php get_header(); ?>

<?php
/* Carousel Images */

	global $post;

	$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
	
    $full_image = wp_get_attachment_image_src( $post_thumbnail_id,'full'); 
    $medium_image = wp_get_attachment_image_src( $post_thumbnail_id,'large');
    ?>

<div id="home" class="home-image img-holder" data-image-mobile="<?php echo $medium_image[0]; ?>" data-image="<?php echo $full_image[0]; ?>" data-width="<?php echo $full_image[1]; ?>" data-height="<?php echo $full_image[2]; ?>" data-extra-height="100">
	<div class="holder container">
		<div class="inner">
			<span class="introduction">We craft <span class="bg-info">refined user experiences</span> and <br><span class="bg-warning">powerful back-end</span> services to enrich the<br> way people <span class="bg-primary">relate</span> with the web_</span>
			<div class="cta-section">
				<a href="#" class="btn btn-primary btn-dev btn-lg">Find Out More</a> <a href="#" class="btn btn-warning btn-dev btn-lg">Plan a Project</a>
			</div>
		</div><!--/.inner-->
	</div>
</div>


<?php get_template_part('home','services'); ?>

<?php get_template_part('home','plan'); ?>

<?php get_template_part('home','work'); ?>

<?php get_template_part('home','partners'); ?>

<?php get_template_part('home','team'); ?>





<?php get_footer(); ?>
