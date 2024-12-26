var comp = app.project.activeItem; // Get the active composition

if (comp && comp.selectedLayers.length > 0) {
    var compHeight = comp.height; // Composition height
    var currentX = 0; // Starting X position for the first image

    for (var i = 0; i < comp.selectedLayers.length; i++) {
        var layer = comp.selectedLayers[i];
        
        // Get the layer's source dimensions
        var bounds = layer.sourceRectAtTime(0, false);
        var layerWidth = bounds.width;
        var layerHeight = bounds.height;

        // Calculate the scale to fit the composition height
        var scaleFactor = (compHeight / layerHeight) * 100;
        layer.transform.scale.setValue([scaleFactor, scaleFactor]); // Uniform scaling

        // Update the layer's width after scaling
        var scaledWidth = (layerWidth * scaleFactor) / 100;

        // Align the layer to the left of the previous one
        layer.position.setValue([
            currentX - scaledWidth / 2 - bounds.left,
            compHeight / 2
        ]);

        // Update the current X position for the next layer
        currentX -= scaledWidth;
    }
} else {
    alert("Please select the layers you want to arrange side by side.");
}
