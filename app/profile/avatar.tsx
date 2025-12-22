import AvatarItem from "@/components/AvatarItem";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import Tab from "@/components/Tab";
import useGetAvatarItems from "@/hooks/queries/useGetAvatarItems";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function AvatarScreen() {
  const pagerRef = useRef<PagerView | null>(null);
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();
  const [currentTab, setCurrentTab] = useState(0);

  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {["모자", "얼굴", "상의", "하의", "손", "피부"].map((tab, index) => (
            <Tab
              key={index}
              isActive={currentTab === index}
              onPress={() => handlePressTab(index)}
            >
              {tab}
            </Tab>
          ))}
        </View>
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
        >
          <FlatList
            data={hats}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={faces}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={tops}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={bottoms}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={hands}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            data={skins}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
        </PagerView>
      </View>
      <FixedBottomCTA label="저장" onPress={() => {}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 120,
    marginTop: 10,
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
  },
  pagerView: {
    flex: 1,
  },
});
