function setup_project_detail(project_detail) {
    var project_images = project_detail.find('.images .image');

    // Set click event
    project_images.on('click', select_active_image);
    // Center the first image
    center_images(project_images.eq($('.images').attr('active-image')));

    $('.view-image').on('click transitionend', close_view_image);
    $(".nano").nanoScroller({ flash: true });
}

function select_active_image() {
    var images = $(this).parents('.images');
    var selected_image = $(this);

    if (images.attr('active-image') != selected_image.index()) {
        images.attr('active-image', selected_image.index());
        center_images(selected_image)
    }
    else
    {
        var view_image = $('.view-image');
        view_image.empty();

        selected_image.find('img').clone().appendTo(view_image);
        view_image.addClass('active');

        view_image.on('click', close_view_image);
    }
}

function center_images(selected_image) {
    var images = selected_image.parents('.images');

    var selected_center = selected_image.position().left + (selected_image.width() / 2);

    images_offset = images.offset();
    images_offset.left = ($(document).width() / 2) - selected_center;
    images.offset(images_offset);
}

function close_view_image(event) {
    var target = $(event.target).closest('.view-image');

    if (event.type == 'click') {
        target.css('opacity', '0');
        target.css('pointer-events', 'none');
    }
    else if (event.type == 'transitionend' && target.css('opacity') == 0) {
        target.removeAttr('style');
        target.removeClass('active');
    }
}
