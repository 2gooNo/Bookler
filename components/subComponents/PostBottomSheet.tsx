import BottomSheet from "@gorhom/bottom-sheet";
import { PostOptions } from "./PostOptions";

export function PostBottomSheet({
  handleSheetChanges,
  bottomSheetRef,
  navigation,
}: any) {
  return (
    <BottomSheet
      snapPoints={[400, 230]}
      onChange={handleSheetChanges}
      ref={bottomSheetRef}
      index={-1}
      containerHeight={600}
      enablePanDownToClose={true}
      style={{
        width: "100%",
        height: "auto",
        zIndex: 10,
      }}
      backgroundStyle={{
        backgroundColor: "#121212",
      }}
      handleIndicatorStyle={{ backgroundColor: "transparent" }}
      onClose={() =>
        navigation.getParent().setOptions({
          tabBarStyle: {
            display: "flex",
          },
        })
      }
    >
      <PostOptions />
    </BottomSheet>
  );
}
