package model;

public class Izvestavanje {

	private String nazivFilma;
	private int brojProjekcija;
	private int brojProdatihKarata;
	private int ukupnaCena;

	public Izvestavanje(String nazivFilma, int brojProjekcija, int brojProdatihKarata, int ukupnaCena) {
		super();
		this.nazivFilma = nazivFilma;
		this.brojProjekcija = brojProjekcija;
		this.brojProdatihKarata = brojProdatihKarata;
		this.ukupnaCena = ukupnaCena;
	}

	public String getNazivFilma() {
		return nazivFilma;
	}

	public void setNazivFilma(String nazivFilma) {
		this.nazivFilma = nazivFilma;
	}

	public int getBrojProjekcija() {
		return brojProjekcija;
	}

	public void setBrojProjekcija(int brojProjekcija) {
		this.brojProjekcija = brojProjekcija;
	}

	public int getBrojProdatihKarata() {
		return brojProdatihKarata;
	}

	public void setBrojProdatihKarata(int brojProdatihKarata) {
		this.brojProdatihKarata = brojProdatihKarata;
	}

	public double getUkupnaCena() {
		return ukupnaCena;
	}

	public void setUkupnaCena(int ukupnaCena) {
		this.ukupnaCena = ukupnaCena;
	}
	
	
}
