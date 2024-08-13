import { useCallback, useRef } from "react";
import { Button, Text, View } from "react-native";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PostOptions } from "./PostOptions";

export function PostCard({ item }: { item: any }) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <View>
      <Text style={{ color: "white" }}>{item?.post?.[0]?.title || ""}</Text>
      {/* <Button
        title="Open Bottom Sheet"
        onPress={() =>
          bottomSheetRef.current && bottomSheetRef.current.expand()
        }
      /> */}

      {/* <BottomSheet
        index={-1}
        // bottomInset={0}
        detached={true}
        enablePanDownToClose={true}
        containerHeight={300}
        snapPoints={[1, 200, 600]}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        style={{ marginBottom: 0 }}
      >
        <PostOptions />
      </BottomSheet> */}
    </View>
  );
}
