function setup_project_detail(project_detail) {
    var project_images = project_detail.find('.images .image');

    project_images.on('click', select_active_image);
    // Center the first image
    center_images(project_images.eq($('.images').attr('active-image')));

    $('.view-image').on('click transitionend', close_view_image);
    $(".nano").nanoScroller({ flash: true });

    $(window).on('resize', function() { center_images(project_images.eq($('.images').attr('active-image'))); });
}

function select_active_image(event) {
    var images = $(event.currentTarget).parents('.images');
    var selected_image = $(event.currentTarget);

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
    var view_image = $('.view-image');

    if (event.type == 'click') {
        view_image.css('opacity', '0');
        view_image.css('pointer-events', 'none');
    }
    else if (event.type == 'transitionend' && view_image.css('opacity') == 0) {
        view_image.removeAttr('style');
        view_image.removeClass('active');
    }
}
