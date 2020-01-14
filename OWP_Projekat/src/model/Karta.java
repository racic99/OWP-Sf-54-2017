package model;

public class Karta {

	private int id;
	private int projekcija;
	private int sediste;
	private String datumVreme;
	private String korisnik;
	private boolean aktivan;
	
	public Karta() {
		this.aktivan=true;
	}

	public Karta(int id, int projekcija, int sediste, String datumVreme, String korisnik, boolean aktivan) {
		super();
		this.id = id;
		this.projekcija = projekcija;
		this.sediste = sediste;
		this.datumVreme = datumVreme;
		this.korisnik = korisnik;
		this.aktivan = aktivan;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProjekcija() {
		return projekcija;
	}

	public void setProjekcija(int projekcija) {
		this.projekcija = projekcija;
	}

	public int getSediste() {
		return sediste;
	}

	public void setSediste(int sediste) {
		this.sediste = sediste;
	}

	public String getDatumVreme() {
		return datumVreme;
	}

	public void setDatumVreme(String datumVreme) {
		this.datumVreme = datumVreme;
	}

	public String getKorisnik() {
		return korisnik;
	}

	public void setKorisnik(String korisnik) {
		this.korisnik = korisnik;
	}

	public boolean isAktivan() {
		return aktivan;
	}

	public void setAktivan(boolean aktivan) {
		this.aktivan = aktivan;
	}
	
	
	
}
