import 'es6-symbol/implement';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { computed, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

@observer
export default class App extends React.Component {

  constructor(props: any) {
    super(props);
  }

  @observable public flourWeight: number = 1000;
  @observable public waterWeight: number = 725;
  @observable public leavenWeight: number = 200;
  @observable public leavenHydration: number = 100;

  @computed public get leavenFlour(): number {
    if (this.leavenHydration != null && this.leavenWeight != null) {
      return (this.leavenWeight / (1 + this.leavenHydration / 100));
    }
    return 0;
  }

  @computed public get leavenWater(): number {
    if (this.leavenHydration != null && this.leavenWeight != null) {
      return (this.leavenWeight / (1 + this.leavenHydration / 100)) * (this.leavenHydration / 100);
    }
    return 0;
  }

  @computed public get totalFlour(): number {
    if (this.flourWeight != null && this.leavenFlour != null) {
      return this.flourWeight + this.leavenFlour;
    }
    return 0;
  }

  @computed public get totalWater(): number {
    if (this.waterWeight != null && this.leavenWater != null) {
      return this.waterWeight + this.leavenWater;
    }
    return 0;
  }

  @computed public get totalHydration(): number {
    if (this.totalFlour != null && this.totalWater != null) {
      return this.totalWater / this.totalFlour;
    }
    return 0;
  }

  @computed public get recommendedSalt(): number {
    if (this.totalFlour != null) {
      return this.totalFlour * 0.22;
    }
    return 0;
  }

  @computed public get postBakeWeight(): number {
    if (this.totalFlour != null && this.totalWater != null) {
      return 0.85 * (this.totalWater + this.totalFlour);
    }
    return 0;
  }

  @observable public desiredTargetHydration: number = 0;

  @computed public get waterWeightToMatchDesiredTargetHydration(): number {
    if (this.flourWeight != null && this.leavenWeight != null && this.leavenHydration != null) {
      return ((this.desiredTargetHydration / 100) * this.totalFlour) - this.leavenWater;
    }
    return 0;
  }

  public render() {

    return (
      <ErrorBoundary>
        <KeyboardAvoidingView behavior="position" style={styles.flex}>
          <ScrollView contentContainerStyle={styles.flex}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 8 }}>
              <Text style={{ marginHorizontal: 8, fontSize: 14 }}>Quick Set Flour</Text>
              <TouchableOpacity onPress={() => runInAction(() => this.flourWeight = 1000)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>1000g</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => this.flourWeight = 2000)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>2000g</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => this.flourWeight = 3000)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>3000g</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 8 }}>
              <Text style={{ marginHorizontal: 8, fontSize: 14 }}>Quick Set Leaven Inoculation</Text>
              <TouchableOpacity onPress={() => runInAction(() => this.leavenWeight = 0.15 * this.flourWeight)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>15%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => this.leavenWeight = 0.2 * this.flourWeight)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>20%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => this.leavenWeight = 0.25 * this.flourWeight)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>25%</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 8 }}>
              <Text style={{ marginHorizontal: 8, fontSize: 14 }}>Quick Set Leaven Hydration</Text>
              <TouchableOpacity onPress={() => runInAction(() => this.leavenHydration = 50)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>50%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => this.leavenHydration = 75)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>75%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => this.leavenHydration = 100)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>100%</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => runInAction(() => this.leavenHydration = 150)} style={{ marginHorizontal: 8 }}>
                <Text style={{ fontSize: 14 }}>150%</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Flour Weight</Text><TextInput
              style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              value={this.flourWeight + ''}
              onChangeText={(text) => { runInAction(() => this.flourWeight = Number(text) ? Number(text) : 0); }} /></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Water Weight</Text><TextInput
              style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              value={this.waterWeight + ''}
              onChangeText={(text) => { runInAction(() => this.waterWeight = Number(text) ? Number(text) : 0); }} /></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Leaven Weight</Text><TextInput
              style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              value={this.leavenWeight + ''}
              onChangeText={(text) => { runInAction(() => this.leavenWeight = Number(text) ? Number(text) : 0); }} /></View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Leaven Hydration</Text><TextInput
              style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              value={this.leavenHydration + ''}
              onChangeText={(text) => { runInAction(() => this.leavenHydration = Number(text) ? Number(text) : 0); }} /></View>

            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Total Hydration: {(this.totalHydration * 100).toFixed(2)}</Text>

            <Text>Total Flour: {this.totalFlour.toFixed(2)}</Text>
            <Text>Total Water: {this.totalWater.toFixed(2)}</Text>
            <Text> Leaven Water: {this.leavenWater.toFixed(2)}</Text>
            <Text> Leaven Flour: {this.leavenFlour.toFixed(2)}</Text>

            <Text>Recommended Salt: {this.recommendedSalt.toFixed(2)}</Text>
            <Text>Approximate Post Bake Weight: {this.postBakeWeight.toFixed(2)}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Text>Desired Hydration</Text><TextInput
              value={this.desiredTargetHydration + ''}
              style={{ borderColor: 'red', borderWidth: StyleSheet.hairlineWidth, fontSize: 40 }}
              onChangeText={(text) => { runInAction(() => this.desiredTargetHydration = Number(text) ? Number(text) : 0); }} /></View>

            {this.waterWeightToMatchDesiredTargetHydration != null && this.waterWeightToMatchDesiredTargetHydration > 0 &&
              <Text style={{ fontSize: 30 }}>
                Add {this.waterWeightToMatchDesiredTargetHydration.toFixed(0)}g water to
                {this.flourWeight}g flour and
                {this.leavenWeight}g leaven
                ({this.leavenHydration} hydration) in order to reach target hydration of
                {this.desiredTargetHydration}%
              </Text>
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </ErrorBoundary >
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
