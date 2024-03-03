from pathlib import Path
import pandas as pd


def main():
    df = pd.read_csv(Path(__file__).parent.parent / "input.csv")
    # Data normalization
    df["Can score trap?"] = (
        df["Can score trap?"].replace("No", False).replace("Yes", True)
    )
    df["Outcome"] = (
        df["Outcome"].replace("Win", 1).replace("Loss", -1).replace("Tie", 0)
    )
    df["Timestamp"] = pd.to_datetime(df["Timestamp"], infer_datetime_format=True)
    df["Match ID (Quals-1, Elims-12 / Playoffs-12)"] = df[
        "Match ID (Quals-1, Elims-12 / Playoffs-12)"
    ].map(lambda x: "Qual " + "".join(y for y in x if y in "1234567890"))
    df["Alliance"] = df["Alliance"].replace("Red", 1).replace("Blue", -1)
    df["Auto Mobility"] = (
        df["Mobility"].replace("Success", 1).replace("Failure", -1).replace("DC", -1)
    )

    # print("....")
    # print(df["Alliance", "Team #", "# Speaker Notes", "# Amp Notes"])
    # df.loc[df['Year'] == '2019', 'Outcome'].sum()
    print(df)


if __name__ == "__main__":
    main()
