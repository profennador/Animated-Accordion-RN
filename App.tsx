import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";
import data from "./data";
import Accordion from "./Accordion";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Accordion content={item.content} heading={item.heading} />
        )}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
}

function ItemSeparatorComponent() {
  return <View style={{ paddingVertical: 8 }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C2D42",
    padding: 24,
  },
});
