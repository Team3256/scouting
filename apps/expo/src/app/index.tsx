import type { FontSizeTokens, SelectProps } from "tamagui";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  getFontSize,
  Input,
  Label,
  Select,
  Sheet,
  SizeTokens,
  TextArea,
  XStack,
  YStack,
} from "tamagui";

import type { RouterOutputs } from "../utils/api";
import { quantitativeScouting } from "../../../../packages/db/schema";
import { AuthAvatar } from "../components/header";
import { api } from "../utils/api";

const items = [
  { name: "Apple" },
  { name: "Pear" },
  { name: "Blackberry" },
  { name: "Peach" },
  { name: "Apricot" },
  { name: "Melon" },
  { name: "Honeydew" },
  { name: "Starfruit" },
  { name: "Blueberry" },
  { name: "Raspberry" },
  { name: "Strawberry" },
  { name: "Mango" },
  { name: "Pineapple" },
  { name: "Lime" },
  { name: "Lemon" },
  { name: "Coconut" },
  { name: "Guava" },
  { name: "Papaya" },
  { name: "Orange" },
  { name: "Grape" },
  { name: "Jackfruit" },
  { name: "Durian" },
];
function SelectDemoItem(props: SelectProps) {
  const [val, setVal] = useState("apple");

  return (
    <Select
      id="food"
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          {/* <LinearGradient
						start={[0, 0]}
						end={[0, 1]}
						fullscreen
						colors={["$background", "transparent"]}
						borderRadius="$4"
					/> */}
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items],
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          {/* <LinearGradient
						start={[0, 0]}
						end={[0, 1]}
						fullscreen
						colors={["transparent", "$background"]}
						borderRadius="$4"
					/> */}
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
interface MatchScoutAssignment {
  // alliance: "red" | "blue";
  team: number;
  red: [number, number, number];
  blue: [number, number, number];
}
function MatchScoutAssignment({
  assignment,
}: {
  assignment: MatchScoutAssignment;
}) {
  return (
    <View className="bg-blue/10 flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow flex-col">
        <View className="flex flex-row justify-evenly">
          <View>
            <Text className="text-emerald-400">
              <Text
                style={{ padding: 20 }}
                className="rounded-box bg-stone-500 text-cyan-300"
              >
                Red
              </Text>
              : {assignment.red.join(", ")}
            </Text>
            <Text className="text-emerald-400">
              Blue: {assignment.blue.join(", ")}
            </Text>
          </View>
          <View>
            <Text className="text-emerald-400">
              Your team: {assignment.team}
            </Text>
            <View className="bg-zinc-900">
              <Link href="/match/" asChild={true}>
                <Button>Start</Button>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
// function PostCard({ post }: { post: RouterOutputs["post"]["all"][number] }) {
// 	const utils = api.useUtils();

// 	const { mutate: deletePost } = api.post.delete.useMutation({
// 		onSettled: () => utils.post.all.invalidate(),
// 		onError: (error) => {
// 			if (error.data?.code === "UNAUTHORIZED")
// 				Alert.alert("Error", "Only the author can delete their post");
// 		},
// 	});

// 	return (
// 		<View className="flex flex-row rounded-lg bg-white/10 p-4">
// 			<View className="flex-grow">
// 				<Link
// 					asChild
// 					href={{
// 						pathname: "/post/[id]",
// 						params: { id: props.post.id },
// 					}}
// 				>
// 					<Pressable>
// 						<Image
// 							className="mr-2 h-10 w-10 self-center rounded-full"
// 							source={post.author?.image ?? ""}
// 						/>
// 						<View>
// 							<Text className="text-xl font-semibold text-emerald-400">
// 								{post.title}
// 							</Text>
// 							<Text className="mt-2 text-zinc-200">{post.content}</Text>
// 						</View>
// 					</Pressable>
// 				</Link>
// 			</View>
// 			<Pressable onPress={() => deletePost(post.id)}>
// 				<Text className="font-bold uppercase text-emerald-400">Delete</Text>
// 			</Pressable>
// 		</View>
// 	);
// }

// function CreatePost() {
// 	const utils = api.useUtils();

// 	const [title, setTitle] = React.useState("");
// 	const [content, setContent] = React.useState("");

// 	const { mutate: createPost, error } = api.post.create.useMutation({
// 		onSuccess: async () => {
// 			setTitle("");
// 			setContent("");
// 			Keyboard.dismiss();
// 			await utils.post.all.invalidate();
// 		},
// 		onError: (error) => {
// 			if (error.data?.code === "UNAUTHORIZED")
// 				Alert.alert("Error", "You must be logged in to create a post");
// 		},
// 	});

// 	return (
// 		<KeyboardAvoidingView
// 			behavior={Platform.OS === "ios" ? "padding" : "height"}
// 			keyboardVerticalOffset={150}
// 		>
// 			<TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
// 				<View className="mt-4 justify-around">
// 					<TextInput
// 						className="mb-2 rounded bg-white/10 p-2 text-zinc-200"
// 						placeholderTextColor="#A1A1A9" // zinc-400
// 						value={title}
// 						onChangeText={setTitle}
// 						placeholder="Title"
// 					/>
// 					{error?.data?.zodError?.fieldErrors.title && (
// 						<Text className="mb-2 text-red-500">
// 							{error.data.zodError.fieldErrors.title}
// 						</Text>
// 					)}
// 					<TextInput
// 						className="mb-2 rounded bg-white/10 p-2 text-zinc-200"
// 						placeholderTextColor="#A1A1A9" // zinc-400
// 						value={content}
// 						onChangeText={setContent}
// 						placeholder="Content"
// 					/>
// 					{error?.data?.zodError?.fieldErrors.content && (
// 						<Text className="mb-2 text-red-500">
// 							{error.data.zodError.fieldErrors.content}
// 						</Text>
// 					)}
// 					<Pressable
// 						className="rounded bg-emerald-400 p-2"
// 						onPress={() => {
// 							createPost({
// 								title,
// 								content,
// 							});
// 						}}
// 					>
// 						<Text className="font-semibold text-zinc-900">Publish post</Text>
// 					</Pressable>
// 				</View>
// 			</TouchableWithoutFeedback>
// 		</KeyboardAvoidingView>
// 	);
// }
// import matchScoutAssignments from "../../../../packages/api/src/TBA/fetchMatches";
export default function HomeScreen() {
  const utils = api.useUtils();
  const { data: matches } = api.scouting.matchesInEvent.useQuery({
    event: "test",
  });
  console.log(matches);
  // VERY BAD CODE
  const teams = {
    red: matches?.filter((x) => x.alliance.startsWith("red")) ?? [],
    blue: matches?.filter((x) => x.alliance.startsWith("blue")) ?? [],
  };
  console.log(teams);
  function getUniqueTeamsAcrossAlliances() {
    const uniqueTeams = new Set<number>();
    matches?.forEach((x) => {
      uniqueTeams.add(parseInt(x.teamNum));
    });
    return Array.from(uniqueTeams);
  }

  // const { data: posts } = api.post.all.useQuery();
  const matchScoutAssignments: MatchScoutAssignment[] =
    getUniqueTeamsAcrossAlliances().map((x) => {
      return {
        team: x,
        red: teams.red.map((x) => x.teamNum) as unknown as [
          number,
          number,
          number,
        ], //.filter((y) => y.teamNum === x).map((y) => y.matchNum),
        blue: teams.blue.map((x) => x.teamNum) as unknown as [
          number,
          number,
          number,
        ], //.filter((y) => y.teamNum === x).map((y) => y.matchNum),
      };
    }); //
  // matches.map((x) => {
  //   return {
  //     alliance: x.alliance.slice(0, -1),
  //     team: parseInt(x.teamNum),
  //     red,
  //   };
  // });
  // //   [
  //   { alliance: "red", team: 5, red: [9, 2, 3], blue: [4, 5, 6] },
  //   { alliance: "red", team: 5, red: [8, 2, 3], blue: [4, 5, 6] },
  // ];

  return (
    <SafeAreaView className="bg-zinc-900">
      <Stack.Screen
        options={{
          headerLeft: () => <AuthAvatar />,
          headerTitle: () => (
            <Text className="text-3xl font-bold text-zinc-200">
              <Text className="text-fuchsia-500">T3</Text>
              <Text> x </Text>
              <Text className="text-emerald-400">Supabase</Text>
            </Text>
          ),
        }}
      />
      <View className="h-full w-full p-4">
        {/* <XStack ai="center">
					<Label f={1} fb={0} color="white">
						Native
					</Label>

					<SelectDemoItem native />
				</XStack> */}
        <Pressable
          className="my-4 rounded bg-emerald-400 p-2"
          onPress={() => void utils.post.all.invalidate()}
        >
          <Text className="font-semibold text-zinc-900">Refresh posts</Text>
        </Pressable>
        {/* <SelectDemoItem /> */}
        <FlashList
          data={matchScoutAssignments}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => <MatchScoutAssignment assignment={p.item} />}
        />
        <Text>
          {JSON.stringify(
            Object.keys(quantitativeScouting).filter(
              (x) => !(x.toLowerCase().endsWith("id") || x === "createdAt"),
            ),
          )}
        </Text>
        {/* <YStack width={200} minHeight={250} margin="$3" padding="$2">
					<XStack alignItems="center">
						<Input flex={1} size={"$2"} placeholder={`Size ${"$2"}...`} />
						<Button size={"$2"}>Go</Button>
					</XStack>
					<XStack alignItems="center">
						<Input flex={1} size={"$2"} placeholder={`Size ${"$2"}...`} />
						<Button size={"$2"}>Go</Button>
					</XStack>
					<XStack alignItems="center">
						<Input flex={1} size={"$3"} placeholder={`Size ${"$3"}...`} />
						<Button size={"$3"}>Go</Button>
					</XStack>
					<XStack alignItems="center">
						<Input flex={1} size={"$4"} placeholder={`Size ${"$4"}...`} />
						<Button size={"$4"}>Go</Button>
					</XStack>
					<TextArea placeholder="Enter your details..." />
				</YStack> */}

        {/* <CreatePost /> */}
      </View>
    </SafeAreaView>
  );
}
