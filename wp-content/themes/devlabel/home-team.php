<?php global $post; ?>

<?php $page =  get_page_by_title('The Team'); ?>
<?php $post_thumbnail_id = get_post_thumbnail_id( $page->ID );?>
<?php $full_image = wp_get_attachment_image_src( $post_thumbnail_id,'full');?> 

<section id="team" style="background: #f1f1f1 url(<?php echo $full_image[0];?>) 50% 50% no-repeat;">
	<div class="container">
		<div class="row">
			<div class="main-team-page col-md-6">
				<?php
				// The Query
				$the_query = new WP_Query( array('p'=>$page->ID,'post_type'=>'page'));
				$default = array('class'=>'img-responsive');
				// The Loop
				if ( $the_query->have_posts() ) { $count = 0;?>
					<?php while ( $the_query->have_posts() ) { $the_query->the_post(); $count++;?>
						<h2 class="title"><?php the_title();?></h2>
						<?php the_content();?>
					<?php } ?>
				<?php
				}
				wp_reset_postdata();
				?>
			</div>
		</div>

		<?php
		// The Query
		$the_query = new WP_Query( array('post_type'=>'team-member'));
		$default = array('class'=>'img-responsive');
		// The Loop
		if ( $the_query->have_posts() ) { $count = 0;?>
			<div class="row">
			<?php while ( $the_query->have_posts() ) { $the_query->the_post(); $count++;?>
				<?php $role = get_post_meta($post->ID,'_byline',true);?>
				<div class="team-member col-md-2">
					<?php the_post_thumbnail('thumbnail',$default);?>
					<h4><span class="bg-warning"><?php the_title();?></span></h4>
					<span class="description"><?php _e($role,'ppm');?></span>
				</div>
				<?php if ($count %6 == 0) echo '<div class="clearfix"></div>';?>
			<?php } ?>
			</div>
		<?php
		}
		wp_reset_postdata();
		?>

	</div> <!-- container -->
</section><!--/.services-->