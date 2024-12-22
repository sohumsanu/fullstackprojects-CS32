import com.squareup.moshi.JsonAdapter;

import com.squareup.moshi.Moshi;

import back.FeaturesRecord.FeatureCollection;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Set;

public class GeoParser {

    public List<Feature> jsonToFeat(String filePath) {
        // Create a Moshi instance
        Moshi moshi = new Moshi.Builder().build();

        // Create a JSON adapter for your class
        JsonAdapter<FeatureCollection> adapter = moshi.adapter(FeatureCollection.class);

        try {
            // Read the GeoJSON content from the file
            String geoString = Files.readString(Path.of(filePath), StandardCharsets.UTF_8);

            // Parse the GeoJ,SON string into an object
            FeatureCollection featureCollection = adapter.fromJson(geoString);

            Set<Feature> filteredFeats = featureCollection.filter();
            // Now you can work with the parsed data
            List<Feature> features = featureCollection.getFeatures();

            return filteredFeats;

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
