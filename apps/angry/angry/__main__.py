from pathlib import Path
import pandas as pd


def main():
    df = pd.read_csv(Path(__file__).parent.parent / "input.csv")
    df = df[df["Team #"].astype(str).str.isdigit()]
    # Data normalization
    df["Can score trap?"] = (
        df["Can score trap?"].replace("No", False).replace("Yes", True)
    )
    df["Outcome"] = (
        df["Outcome"].replace("Win", 1).replace("Loss", -1).replace("Tie", 0)
    )

    df["# Speaker Notes"] = (
        df["# Speaker Notes"].replace("DC", float("nan")).astype(float)
    )
    df["# Amp Notes"] = df["# Amp Notes"].replace("DC", float("nan")).astype(float)
    df["Timestamp"] = pd.to_datetime(df["Timestamp"], infer_datetime_format=True)
    df["Match ID (Quals-1, Elims-12 / Playoffs-12)"] = df[
        "Match ID (Quals-1, Elims-12 / Playoffs-12)"
    ].map(lambda x: "Qual " + "".join(y for y in x if y in "1234567890"))
    df["Alliance"] = df["Alliance"].replace("Red", 1).replace("Blue", -1)
    df["Auto Mobility"] = (
        df["Mobility"].replace("Success", 1).replace("Failure", -1).replace("DC", -1)
    )
    team_summary = df.groupby("Team #")["Outcome"].sum().rename("Total win - loss")
    team_notes = df.groupby("Team #")[["# Speaker Notes", "# Amp Notes"]].sum()
    team_counts = df["Team #"].value_counts()
    team_notes_divided = team_notes.div(team_counts, axis=0)

    team_notes_sorted = team_notes_divided.sort_values(
        by=["# Speaker Notes", "# Amp Notes"], ascending=False
    )
    print(team_notes_sorted)
    print(team_summary)
    # print("....")
    # print(df["Alliance", "Team #", "# Speaker Notes", "# Amp Notes"])
    # df.loc[df['Year'] == '2019', 'Outcome'].sum()
    # print(df)


if __name__ == "__main__":
    main()
